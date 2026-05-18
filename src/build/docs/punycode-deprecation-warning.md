# Punycode Deprecation Warning

When running `crb dev`, you may see this warning in the console:

```
(node:22260) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
```

## What causes it

The built-in Node.js `punycode` module has been deprecated since Node 20 in favour of the userland [`punycode`](https://www.npmjs.com/package/punycode) npm package.

The warning comes from **`node-fetch@2.7.0`**, a transitive dependency of `contensis-management-api`, `isomorphic-fetch`, and `cross-fetch`. These packages bundle their own copies of `whatwg-url@5.0.0` and `tr46@0.0.3`, which import the deprecated built-in `punycode`:

```
node_modules/node-fetch/node_modules/whatwg-url/lib/url-state-machine.js
node_modules/node-fetch/node_modules/tr46/index.js
```

## Is it harmful?

**No.** This is a deprecation warning, not an error. The built-in `punycode` module still works correctly in Node 24 and is unlikely to be removed until a future major Node.js version.

## Can it be fixed?

Not without changing upstream dependencies. Options:

| Option | Trade-off |
|---|---|
| **Leave it** | No action needed. Harmless warning that will self-resolve when `contensis-management-api` and `isomorphic-fetch` update their `node-fetch` dependency. |
| **Yarn resolution** | Force newer `whatwg-url` and `tr46` via root `resolutions`. Risky — `node-fetch@2` may not be compatible with major version bumps of these packages. |
| **Suppress with `--no-deprecation`** | Add `NODE_OPTIONS=--no-deprecation` to the dev script. Hides all deprecation warnings, not just this one. |

**Recommendation:** Leave it for now. This is an upstream issue outside the scope of this project.
