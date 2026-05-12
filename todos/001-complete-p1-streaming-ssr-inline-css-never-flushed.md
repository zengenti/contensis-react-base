---
status: complete
priority: p1
issue_id: 001
tags: [code-review, ssr, streaming, regression, bug]
dependencies: []
---

# P1 — Inlined chunk CSS never reaches the streaming SSR response (FOUC fix is a no-op on streaming path)

## Problem Statement

The commit `3d889059` ("fix(ssr): inline @loadable chunk CSS to eliminate FOUC")
sets out to eliminate FOUC by inlining `@loadable/component` chunk CSS into the
SSR shell. On the **non-streaming** path (`isRenderingJsxToString === true`)
this works. On the **streaming** path (the default for full HTML SSR) the
inlined CSS is computed but **never written into the response**, so FOUC
persists in the most common production code path.

## Findings

### Flow on the streaming path

In `src/server/webApp.tsx`:

```ts
let loadableInlineStyles = '';

const getContextHtml = (isFinal = false, styleTags?, renderedJsxMarkup?) => {
  // ...
  const styles = loadableInlineStyles;          // read at call time
  const html = replaceHtml({
    styleTags: `${styleTags || ''}${styles || ''}`,  // → injected at {{CRITICAL_CSS}} (in <head>)
    templateHTML, /* ... */
  }, accessMethod);
  return html;
};

renderStream(getContextHtml, styledJsx, request, response,
  styledComponentsStream(sheet),
  async () => {
    loadableInlineStyles = await getCachedInlineStyleTags(loadableExtractor);
  });
```

In `src/server/features/response-handler/render-stream.ts`:

```ts
onShellReady() {
  const html = getContextHtml(false);
  // ...
  const header = html.split('{{APP}}')[0];   // <head> + open <body> — flushed NOW
  stream.write(header);
  pipe(stream);
},
async onAllReady() {
  try { if (onAllReadyAsync) await onAllReadyAsync(); } catch { /* logs */ }
  const footer = getContextHtml(true).split('{{APP}}')[1];  // only what comes AFTER {{APP}}
  stream.write(footer);
  // ...
},
```

In `src/server/util/html.ts`, `{{CRITICAL_CSS}}` (where `styleTags` lands) is
in the `<head>` portion — i.e. **before `{{APP}}`** in the template.

### What actually happens

1. `onShellReady` calls `getContextHtml(false)` while `loadableInlineStyles === ''`.
   The header (containing `{{CRITICAL_CSS}}` rendered as empty) is flushed to the
   client. The shell is now on the wire and immutable.
2. `onAllReadyAsync` runs after the full Suspense tree settles and assigns
   `loadableInlineStyles = await getCachedInlineStyleTags(...)`.
3. `onAllReady` calls `getContextHtml(true)` and takes only `.split('{{APP}}')[1]` —
   the footer (scripts, REDUX_DATA, `</body></html>`). The freshly populated
   `{{CRITICAL_CSS}}` is in the discarded *header* portion of that string.

Net result: the inlined CSS is computed, cached, **and thrown away** on every
streaming request. Streaming responses still ship with the prior `getStyleTags()`
behavior — except they no longer get even that, because `getStyleTags()` was
removed from the streaming path entirely (`const styles = loadableInlineStyles;`
replaced `loadableExtractor?.modern?.getStyleTags()`).

### Severity

This is a regression *in addition* to a non-functional fix:

- Before: streaming SSR emitted `<link rel="stylesheet">` tags via
  `getStyleTags()`. Render-blocking but functional — no FOUC after first paint.
- After: streaming SSR emits **nothing** for loadable chunk CSS in the head. The
  page paints unstyled and only gains styles when the client-side `@loadable`
  hydrate kicks in and pulls the CSS down. This is *worse* FOUC than before the
  "fix".

## Proposed Solutions

### Option A — Resolve inline CSS synchronously before `onShellReady` (recommended)

Pre-await the cached inline style tags *before* calling `renderToPipeableStream`,
and pass the resolved string into `getContextHtml`'s closure. This captures all
chunks known at sync-render time (the same set `getStyleTags()` previously used).

- Pros: simplest fix, restores parity with the non-streaming path, no protocol
  changes to `renderStream`. Cache makes the await effectively zero-cost on
  steady state.
- Cons: misses chunks added by Suspense boundaries that resolve mid-stream
  (those will still need `<link>` tags or a follow-up). Acceptable: the prior
  behavior also missed those.
- Effort: Small. Drop the `onAllReadyAsync` parameter; just `await
  getCachedInlineStyleTags(loadableExtractor)` once before invoking
  `renderStream`.
- Risk: Low.

### Option B — Stream a `<style>` tag mid-document for late chunks

Keep Option A's pre-resolved sync inline for shell-time chunks, *plus* emit a
second `<style>` block via `stream.write()` inside `onAllReady` for any chunks
added after the shell flushed. Requires diffing the extractor's chunk set
between shell and final time.

- Pros: covers Suspense-late chunks too (genuine improvement over pre-fix).
- Cons: more code; styles arriving after content can themselves cause a
  visible re-flow on the late-resolved subtree.
- Effort: Medium.
- Risk: Medium — needs care around `onAllReady` running after `pipe` has already
  closed `</body>`.

### Option C — Revert the streaming path

Restore `const styles = loadableExtractor?.modern?.getStyleTags();` for the
streaming branch and only apply the inline-CSS optimisation to
`isRenderingJsxToString`.

- Pros: zero risk, undoes the regression while keeping the partial win.
- Cons: streaming path remains render-blocking on `<link>` requests. Doesn't
  achieve the commit's goal for the streaming branch.
- Effort: Small.
- Risk: None.

## Recommended Action

_(Triage)_

## Technical Details

**Affected files:**
- `src/server/webApp.tsx` (lines ~375–469)
- `src/server/features/response-handler/render-stream.ts` (lines 14–25, 66–75)
- `src/server/util/bundles.ts` (`getCachedInlineStyleTags`)
- `src/server/util/html.ts` (placement of `{{CRITICAL_CSS}}`)

**Behaviour to preserve / restore:**
- Streaming responses must include chunk CSS in `<head>` of the shell (or
  before content paints).
- Non-streaming path's inline-CSS behavior is correct and should remain.

## Acceptance Criteria

- [ ] A streaming SSR response (default path) for a route with a code-split
  CSS chunk contains either inlined `<style>…</style>` or `<link rel="stylesheet">`
  tags for that chunk **before** `{{APP}}` in the response stream.
- [ ] Reproduce in dev: `curl -N <ssr-route> | head -c 8192` shows chunk CSS in
  the head section.
- [ ] No visual FOUC regression vs. pre-commit `f0482322` baseline.
- [ ] `getCachedInlineStyleTags` cache continues to deduplicate disk reads
  across concurrent requests.

## Work Log

- 2026-05-09: Logged during `/ce-review` of branch `fix/fouc-inline-loadable-css`.
  Bug identified by tracing `getContextHtml` ↔ `renderStream`'s
  `split('{{APP}}')` semantics against `replaceHtml`'s `{{CRITICAL_CSS}}`
  placement.

## Resources

- Commit: `3d889059 fix(ssr): inline @loadable chunk CSS to eliminate FOUC`
- `react-dom/server` `renderToPipeableStream`:
  https://react.dev/reference/react-dom/server/renderToPipeableStream
- `@loadable/server` `getInlineStyleTags`:
  https://loadable-components.com/docs/server-side-rendering/
