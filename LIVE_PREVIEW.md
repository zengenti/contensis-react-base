# Live Preview

Live Preview allows a Contensis entry to be updated in real time while the page is rendered inside an iframe. The iframe parent (typically the Contensis CMS editor) posts `postMessage` events carrying an updated entry payload, and the routing saga merges those updates into Redux state - re-running the `entryMapper` if one is configured.

---

## Activation

Live Preview is opt-in, activated by the presence of the `livePreview` query-string parameter on the page URL:

```
https://example.com/my-page?livePreview=true
```

The routing saga reads this via `routeParams`, which merges path params and `window.location.search` query params. Because it relies on `window`, Live Preview is **client-side only** and is never activated during SSR.

---

## How It Works

### 1. Route load (`getRouteSaga`)

After a route is resolved and an entry is found (`pathNode.entry.sys.id` is truthy), the saga checks for the `livePreview` param:

```js
if (params.livePreview && typeof window !== 'undefined') {
  if (livePreviewTask) yield cancel(livePreviewTask);
  livePreviewTask = yield fork(watchLivePreviewSaga, { ... });
}
```

- Any previously running live preview task is **cancelled** before a new one is forked. This handles client-side navigation between pages.
- The forked task runs alongside the normal route setup and survives until explicitly cancelled.

### 2. `postMessage` channel (`createLivePreviewChannel`)

A `redux-saga` `eventChannel` wraps a `window` message listener. Only messages with `type === 'LIVE_ENTRY_UPDATE'` are emitted into the channel; all other messages are ignored.

```js
// Sent by the iframe parent (Contensis CMS editor):
window.frames[0].postMessage({
  type: 'LIVE_ENTRY_UPDATE',
  payload: { /* partial or full Contensis entry fields */ }
}, targetOrigin);
```

### 3. `watchLivePreviewSaga`

Loops indefinitely, taking each message from the channel. `context.entry` is reassigned on each iteration so updates accumulate - each message patches the result of the previous one rather than the entry captured at fork time. `setRouteEntry` is then called with the merged entry.

The channel is closed when the task is cancelled (via the `finally` / `cancelled()` guard), removing the `message` event listener cleanly.

### 4. `setRouteEntry`

Handles updating Redux state with the new entry data. Live preview calls this with `remapEntry = true` to ensure both sub-steps always run regardless of whether the entry id or language has changed.

#### 4a. `entryMapper` re-mapping

Normally `setRouteEntry` reuses the cached `mappedEntry` from Redux when the entry id and language are unchanged. With `remapEntry = true` the mapper is called on every update:

```js
mapRouteEntry(entryMapper, { ...node, entry, ancestors, siblings })
```

The `entryMapper` is resolved (in priority order) from:
1. `staticRoute.route.fetchNode.entryMapper`
2. `contentTypeRoute.entryMapper`

If neither is configured, `mappedEntry` is `null` and only `entry` in the `SET_ENTRY` action carries the updated data.

#### 4b. `SET_ENTRY` dispatched

`SET_ENTRY` is dispatched carrying the updated `entry`, `mappedEntry`, `node`, and `currentPath`, triggering a React re-render.

---

## Sequence Diagram

```
CMS Editor (iframe parent)
        │
        │  postMessage({ type: 'LIVE_ENTRY_UPDATE', payload: {...} })
        ▼
  window 'message' event
        │
        ▼
  eventChannel (redux-saga)
        │
        ▼
  watchLivePreviewSaga
        │  merge: { ...accumulatedEntry, ...payload }
        ▼
  setRouteEntry(remapEntry=true)
        │
        ├─► entryMapper(updatedEntry)  →  mappedEntry
        │
        └─► SET_ENTRY
                │
                ▼
          React re-render
```

---

## Known Limitations & Review Notes

### Entry merging is shallow

```js
{ ...context.entry, ...data.payload }
```

`data.payload` is spread one level deep. Nested objects in the payload replace their counterpart on the original entry rather than deep-merging. This means the iframe parent must send **complete nested objects**, not partial patches of nested fields. If the CMS sends incremental patches, this will discard unchanged nested properties.

### Accumulated updates are applied incrementally

`context.entry` is mutated after each `LIVE_ENTRY_UPDATE`, so each message merges onto the result of the previous one rather than the original entry captured at fork time. This means the iframe parent can send partial field patches and they will accumulate correctly across multiple messages.

### No `postMessage` origin validation

`createLivePreviewChannel` does not check `event.origin`. Any window with access to the iframe (including other iframes or extensions) can dispatch `LIVE_ENTRY_UPDATE` messages and cause Redux state to be overwritten. An origin allowlist should be added:

```js
const ALLOWED_ORIGINS = ['https://cms.example.com'];

const handler = e => {
  if (!ALLOWED_ORIGINS.includes(e.origin)) return;
  if (e.data?.type === 'LIVE_ENTRY_UPDATE') emit(e.data);
};
```

### `livePreviewTask` is a module-level singleton

The task reference is held in a module-level variable. This is safe for client-side navigation (the cancel/fork pattern handles it), but means only one live preview session can be active at a time across all route navigations. This is the expected usage pattern, but it is worth documenting.

### Task is not explicitly cancelled on navigating to a non-entry page

If the user navigates to a route with no entry (e.g. a 404 or static route without `?livePreview`), the existing `livePreviewTask` is not explicitly cancelled and the `message` listener remains active. In practice this is not a concern - Live Preview runs inside a short-lived CMS-managed iframe, and when that iframe is closed the entire window context is destroyed, providing a natural cleanup boundary.
