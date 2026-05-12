---
status: complete
priority: p3
issue_id: 003
tags: [code-review, caching, ssr]
dependencies: []
---

# P3 — `_inlineStyleCache` key only reflects entry assets, and silently no-ops without `modern`

## Problem Statement

`getCachedInlineStyleTags` in `src/server/util/bundles.ts`:

```ts
const assets = modern.getMainAssets('style') || [];
const key = assets.map(a => a.filename).sort().join('|');
```

The key is derived from **main entry** style assets only. In practice
content-hashing of the entry should cascade when any chunk changes, so the key
*does* invalidate across builds — but this is a transitive guarantee, not an
explicit one. A bundler config that pins entry hashes (e.g. `realContentHash:
false` on a CI cache miss) could keep stale CSS served indefinitely.

Additionally, when `loadableExtractor.modern` is absent (legacy-only build,
test environment), the function returns `''` silently — callers can't tell the
difference between "no modern extractor" and "no styles needed", and the
streaming path will ship without any chunk CSS at all.

## Proposed Solutions

### Option A — Key on the inlined HTML's hash

Compute a stable hash (e.g. crypto SHA-1 of the resolved HTML) once on first
resolve and use that as the key. Or include `modern.getInlineStyleTags`'s
underlying chunk filenames if accessible.

### Option B — Include build version in the key

Read `process.env.BUILD_VERSION` / the loadable-stats `hash` field and prepend
it. Cheap and explicit.

### Option C — Fall back to legacy extractor when modern is missing

```ts
const extractor = loadableExtractor?.modern ?? loadableExtractor?.commonLoadableExtractor;
```

Covers the legacy-only path. Verify legacy bundles have CSS associated.

## Acceptance Criteria

- [ ] Cache key is provably invalidated whenever any chunk CSS file changes
  (test by mutating a chunk hash in a stats fixture).
- [ ] Behavior when `modern` extractor is missing is documented or covered by
  fallback.

## Work Log

- 2026-05-09: Logged during `/ce-review`.
