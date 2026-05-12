---
status: complete
priority: p2
issue_id: 002
tags: [code-review, ssr, error-handling, streaming]
dependencies: []
---

# P2 — `onAllReady` partially try-wrapped; sync `getContextHtml(true)` failure can hang the response

## Problem Statement

In `src/server/features/response-handler/render-stream.ts:66-75`, the new
`async onAllReady` wraps only `onAllReadyAsync` in `try/catch`:

```ts
async onAllReady() {
  try {
    if (onAllReadyAsync) await onAllReadyAsync();
  } catch (err) {
    console.error('[renderToPipeableStream:onAllReadyAsync]', err);
  }
  const footer = getContextHtml(true).split('{{APP}}')[1];
  stream.write(footer);
  disposeTimeout();
},
```

If `getContextHtml(true)` or `stream.write` throws synchronously (e.g. helmet
throws on a malformed redirect, `replaceHtml` regex bails, the writable has
been destroyed), the rejection escapes the React stream — `disposeTimeout()`
never runs, the timeout fires later and `response.destroy()` is called against
a half-finished stream. Also, the error log loses the request context.

## Findings

- The async function returns a Promise. Throws inside it propagate to React's
  internal stream machinery, which logs and then closes the underlying stream,
  but the caller's `timeoutId` is leaked until the timeout fires.
- `console.error` does not include request URL / id, which makes triage of
  intermittent SSR failures harder.
- This isn't a strict regression — the previous (non-async) `onAllReady` had
  no try/catch either — but the introduction of an async hook materially
  increases the surface for runtime exceptions.

## Proposed Solutions

### Option A — Widen the try/finally

```ts
async onAllReady() {
  try {
    if (onAllReadyAsync) await onAllReadyAsync();
    const footer = getContextHtml(true).split('{{APP}}')[1];
    stream.write(footer);
  } catch (err) {
    console.error('[renderToPipeableStream:onAllReady]', request.url, err);
    if (!response.writableEnded) response.destroy(err as Error);
  } finally {
    disposeTimeout();
  }
}
```

- Pros: guaranteed `disposeTimeout`; failures don't strand the response.
- Cons: marginally more nesting.
- Effort: Small. Risk: Low.

### Option B — Leave as-is, fix only the timeout leak

Move `disposeTimeout()` into a `finally` and keep current narrow catch.

- Pros: minimal change.
- Cons: doesn't address logging gap or stream half-close.

## Acceptance Criteria

- [ ] Throwing from `onAllReadyAsync` *or* `getContextHtml(true)` does not leak
  `timeoutId`.
- [ ] Error log includes `request.url`.
- [ ] Response is destroyed cleanly on failure rather than hanging until the
  request timer expires.

## Work Log

- 2026-05-09: Identified during `/ce-review`.

## Resources

- `src/server/features/response-handler/render-stream.ts:66-75`
