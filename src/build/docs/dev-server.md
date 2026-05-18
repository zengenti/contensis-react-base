# CRB Dev Server — Consumer Guide

The `crb dev` command starts a full SSR development pipeline: webpack-dev-server for the client bundle, a watched webpack compiler for the Node server bundle, and nodemon for the SSR Express server — all orchestrated with hot-reload support.

## Prerequisites

### Runtime Dependencies

Install these as `devDependencies` in your consumer project. The `crb` CLI does **not** bundle them — it resolves them from your project's `node_modules` at runtime:

```bash
npm install --save-dev webpack webpack-dev-server nodemon cac dotenv rimraf cross-env
```

### Webpack Config

Your `webpack.config.js` must export an **array** of two configs `[clientConfig, serverConfig]` when run in development mode:

```js
// webpack/webpack.config.js
module.exports = [CLIENT_CONFIG, SERVER_CONFIG];
module.exports.parallelism = 2;
```

- **`CLIENT_CONFIG`** — `target: 'web'`, produces the browser bundle served by webpack-dev-server
- **`SERVER_CONFIG`** — `target: 'node'`, produces `dist/server-dev.js` for the SSR server

> **Note:** If your config exports a single object (CSR or ANALYZE mode), the CLI will reject it. Use the unified config that returns an array for SSR dev mode.

### Define Config

Your project must have a `webpack/define-config.js` that exports a `development` object. This is loaded by the dev server and injected as global variables before the SSR server starts:

```js
// webpack/define-config.js
module.exports = {
  development: {
    __isBrowser__: true,
    ALIAS: process.env.ALIAS,
    PROJECT: process.env.PROJECT,
    // ... other runtime defines ...
  },
  production: { /* ... */ },
};
```

### Environment Variables

A `.env` file at your project root must define these required variables:

```env
ALIAS=your-cms-alias
PROJECT=your-project-id
ACCESS_TOKEN=your-access-token
```

Additional variables like `PUBLIC_URL`, `INTERNAL_VIP`, `STATIC_PATH` may also be consumed by your `define-config.js`.

## Usage

### npm Script

Add to your `package.json`:

```json
{
  "scripts": {
    "dev": "rimraf ./dist && cross-env NODE_ENV=development crb dev --config webpack/webpack.config.js"
  }
}
```

- `rimraf ./dist` — clears the previous build before starting
- `cross-env NODE_ENV=development` — ensures `NODE_ENV` is set cross-platform
- `crb dev` — invokes the CLI `dev` subcommand

### CLI Options

```
crb dev [options]

Options:
  --config <path>      Path to webpack config file (required)
  --env-file <path>    Path to the .env file to load. (default: .env)
  --dev-host <host>    Hostname embedded in the client bundle's publicPath and used for HMR
                       WebSocket connections. Must be a hostname or IP reachable by the browser.
                       Set to your machine's LAN IP to access the dev server from other devices.
                       (default: localhost)
  --dev-port <port>    Port webpack-dev-server listens on. Also embedded in the client bundle's
                       publicPath so the browser fetches chunks from the right address.
                       (default: 3000)
  --dev-listen <host>    Network interface webpack-dev-server binds to. The default (0.0.0.0)
                         already accepts connections on all interfaces; set to 127.0.0.1 to
                         restrict to loopback only. Most users never need to change this.
                         (default: 0.0.0.0)
  --open / --no-open     Open the browser automatically when the SSR server starts.
                         Pass --no-open to disable (e.g. in CI or when you want to attach a
                         debugger before the server receives requests). (default: true)
  --inspect [port]       Enable the V8 inspector on the SSR server. Pass a port to override
                         the default. Always on by default at port 9229.
                         (default port: 9229)
  --inspect-brk [port]  Enable the V8 inspector and break before the script starts. Use this
                         to debug server startup — the process pauses until a debugger attaches.
                         Takes precedence over --inspect. Optionally override the port.
                         (default port: 9229)
  -h, --help             Display help
```

### Example

```bash
# Default — webpack-dev-server on port 3000, SSR on port 3001
npm run dev

# Custom port
crb dev --config webpack/webpack.config.js --dev-port 8080

# Access from another device on your LAN — set --dev-host to your machine's LAN IP.
# webpack-dev-server already listens on 0.0.0.0 by default, so --dev-listen is not needed.
crb dev --config webpack/webpack.config.js --dev-host 192.168.1.50
```

## What Happens

```
crb dev --config webpack/webpack.config.js
  │
  ├─ 1. Load .env and validate required env vars (ALIAS, PROJECT, ACCESS_TOKEN)
  ├─ 2. Load your webpack config → [clientConfig, serverConfig]
  ├─ 3. Start webpack-dev-server (client compiler) on port 3000
  │     └─ Serves HMR, client bundle, and public/ static files
  ├─ 4. Start webpack watch (server compiler)
  │     └─ Compiles dist/server-dev.js
  └─ 5. When both compilers emit → start nodemon
       └─ Runs dist/server-dev.js with:
          • --inspect=9229 (or --inspect-brk if passed — see CLI options)
          • -r dev-server-globals.js (injects webpack defines as globals)
          • Watches dist/server-dev.js and src/server/ for changes
```

### Ports

| Service | Port | Purpose |
|---|---|---|
| webpack-dev-server | 3000 (configurable via `--dev-port`) | Client bundle + HMR |
| SSR Express server | 3001 (hardcoded) | Node.js SSR server (nodemon) |
| V8 debugger | 9229 (configurable via `--inspect[=port]`) | Attach Chrome DevTools for Node debugging |

## Troubleshooting

### `'crb' is not recognized`

The `crb` binary is linked via the `bin` entry in `@zengenti/contensis-react-base`. Ensure the package is installed and run `npm install` or `yarn install` to recreate `.bin/` symlinks.

### `Cannot find module 'webpack'` (or `nodemon`, `webpack-dev-server`, etc.)

These are **consumer dependencies**, not CRB dependencies. Install them in your project:

```bash
npm install --save-dev webpack webpack-dev-server nodemon
```

### `webpack config must be an array`

Your `webpack.config.js` is exporting a single object. The CLI requires an array `[clientConfig, serverConfig]`. Check your config's export logic — it may be in CSR or ANALYZE mode based on `process.env`.

### `Missing required env vars: ALIAS, PROJECT, ACCESS_TOKEN`

These must be set in a `.env` file at your project root or exported in your shell before running the command.

### `[nodemon] crashed`

Check the nodemon output above the crash. Common causes:

- `dist/server-dev.js` has a compilation error (check webpack output)
- `webpack/define-config.js` is missing or has a syntax error
- A runtime dependency in your server code is not installed

### Port already in use

The dev server uses ports 3000 and 3001 by default. Use `--dev-port` to change the webpack-dev-server port, or kill the existing process:

```bash
npx kill-port 3000 3001
```

### Monorepo / workspace usage

If your project lives inside a yarn or npm workspace, the root `node_modules` may contain a **published** version of `@zengenti/contensis-react-base` (without the `bin` entry) while your consumer package has a symlink to the local workspace copy. Package managers hoist `.bin/` symlinks from the root, so `crb` won't be found.

**Fix:** Add a `resolutions` override to your root `package.json` to force all consumers to the workspace version:

```json
{
  "resolutions": {
    "@zengenti/contensis-react-base": "workspace:packages/contensis-react-base"
  }
}
```

Then run `yarn install` at the root. This merges all CRB consumers into the workspace resolution (which has the `bin` entry) and recreates the `.bin/crb` symlink.
