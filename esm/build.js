#!/usr/bin/env node
import { cac } from 'cac';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import nodemon from 'nodemon';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

const projectRoot = process.cwd();
const DEVSERVER_RUNTIME_GLOBALS = path.resolve(__dirname, 'dev-server-globals.js');
function runDev(args) {
  const configPath = args.config;
  const devHost = args.devHost || 'localhost';
  const devPort = args.devPort || '3000';
  const devListen = args.devListen || '0.0.0.0';
  const openBrowser = args.open !== false;

  // --inspect-brk takes precedence over --inspect.
  // A bare flag (no port value) resolves to true in cac — treat that as the default port.
  const resolveInspectPort = val => val === true || val === undefined ? '9229' : String(val);
  const inspectNodeArg = args.inspectBrk !== undefined ? `--inspect-brk=${resolveInspectPort(args.inspectBrk)}` : `--inspect=${resolveInspectPort(args.inspect)}`;

  // Validate --config option
  if (!configPath) {
    console.error('[crb] ❌ Error: --config option is required');
    console.log('Usage: crb dev --config <path-to-webpack-config> [--dev-host <host>] [--dev-port <port>] [--dev-listen <host>] [--inspect[=port]] [--inspect-brk[=port]]');
    process.exit(1);
  }
  console.info('[crb] 🚀 Starting SSR dev server pipeline');
  const resolvedConfigPath = path.resolve(projectRoot, configPath);

  // Check config file exists
  if (!fs.existsSync(resolvedConfigPath)) {
    console.error(`[crb] ❌ Error: Config file not found: ${resolvedConfigPath}`);
    process.exit(1);
  }

  // Set default host and port
  process.env.DEV_HOST = devHost;
  process.env.DEV_PORT = devPort;

  // Load .env file
  const envFilePath = path.resolve(projectRoot, args.envFile || '.env');
  try {
    dotenv.config({
      path: envFilePath
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error(`[crb] ❌ Error: Failed to load env file (${envFilePath}): ${msg}`);
    process.exit(1);
  }

  // Validate required environment variables
  const REQUIRED_ENV = ['ALIAS', 'PROJECT', 'ACCESS_TOKEN'];
  const missingEnv = REQUIRED_ENV.filter(k => !process.env[k] || !process.env[k].trim());
  if (missingEnv.length) {
    console.error(`[crb] ❌ Error: Cannot start dev server. Missing required env vars: ${missingEnv.join(', ')}. ` + `Set them in a .env file at the project root or export them in your shell.`);
    process.exit(1);
  }

  // Load project webpack config
  let webpackConfig;
  try {
    webpackConfig = require(resolvedConfigPath);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error(`[crb] ❌ Error: Failed to load webpack config: ${msg}`);
    process.exit(1);
  }

  // Validate webpack config is an array (dual-target mode)
  if (!Array.isArray(webpackConfig)) {
    console.error(`[crb] ❌ Error: webpack config must be an array [clientConfig, serverConfig]. ` + `The config appears to be a single object (CSR/ANALYZE mode). ` + `Use the unified webpack.config.js for SSR dev mode.`);
    process.exit(1);
  }
  const [clientConfig, serverConfig] = webpackConfig;

  // State flags for orchestration
  let clientReady = false;
  let serverReady = false;
  let nodemonStarted = false;
  let browserOpened = false;

  // Nodemon reference for cleanup
  let nodemonInstance = null;

  // Dev server options
  const devServerOptions = {
    host: devListen,
    port: parseInt(devPort, 10),
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    hot: true,
    historyApiFallback: true,
    devMiddleware: {
      index: 'index_csr.html',
      writeToDisk: true
    }
    // TODO: Add proxy config from bundle-info.js (DEVSERVER_PROXIES)
    // to proxy API calls and reverse proxy paths to CMS/IIS
  };

  // Create dual webpack compilers (single config each → single Compiler, not MultiCompiler)
  const clientCompiler = webpack(clientConfig);
  const nodeServerCompiler = webpack(serverConfig);

  // Start nodemon when both compilers are ready
  function startNodemon() {
    if (nodemonStarted) return;
    nodemonStarted = true;
    console.info('[crb] 🎯 Starting nodemon...');
    nodemonInstance = nodemon({
      script: 'dist/server-dev.js',
      ext: 'js json',
      watch: ['dist/server-dev.js'],
      nodeArgs: [inspectNodeArg, '-r', DEVSERVER_RUNTIME_GLOBALS]
    }).on('start', () => {
      console.info('[nodemon] started. Now starting local web server at port 3001, with hot-reload enabled.');
      if (openBrowser && !browserOpened) {
        browserOpened = true;
        try {
          const cmd = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open';
          execSync(`${cmd} http://${process.env.DEV_HOST}:3001/`, {
            windowsHide: true
          });
        } catch {
          console.info(`Please open http://${process.env.DEV_HOST}:3001/ in your browser`);
        }
      }
    }).on('crash', () => {
      console.error('[nodemon] crashed');
    });
  }

  // Server afterEmit -> start nodemon when both compilers are ready
  nodeServerCompiler.hooks.afterEmit.tap('serverAfterEmitPlugin', () => {
    if (serverReady) return;
    serverReady = true;
    if (clientReady) {
      startNodemon();
    }
  });

  // Start server compiler watch immediately
  console.info('[crb] 📦 Starting server compiler...');
  nodeServerCompiler.watch({}, (err, stats) => {
    if (err) {
      return console.error(err);
    }
    const statString = stats.toString();
    process.stdout.write(statString + '\n');
  });

  // Client afterEmit -> start nodemon if server is already ready
  clientCompiler.hooks.afterEmit.tap('clientAfterEmitPlugin', () => {
    if (clientReady) return;
    clientReady = true;
    if (serverReady) {
      startNodemon();
    }
  });

  // Start webpack dev server
  const devServer = new WebpackDevServer(devServerOptions, clientCompiler);
  devServer.startCallback(err => {
    if (err) {
      console.error('[webpack] devServer listening failed');
      return console.error(err);
    }
    console.info(`[webpack] devServer listening on port ${devPort}`);
  });

  // Cleanup on SIGTERM/SIGINT
  function cleanup() {
    console.info('[crb] 🛑 Shutting down...');
    if (nodemonInstance) {
      nodemonInstance.emit('quit');
    }
    devServer.stopCallback(() => {
      console.info('[webpack] devServer stopped');
      clientCompiler.close(() => {
        console.info('[webpack] client compiler closed');
        nodeServerCompiler.close(() => {
          console.info('[webpack] server compiler closed');
          process.exit(0);
        });
      });
    });
  }
  process.on('SIGTERM', cleanup);
  process.on('SIGINT', cleanup);
}

const cli = cac('crb');

// Dev subcommand
cli.command('dev', 'Start the SSR dev server pipeline').option('--config <path>', 'Path to webpack config file (required)').option('--env-file <path>', 'Path to .env file (default: .env)').option('--dev-host <host>', 'webpack publicPath / HMR host (default: localhost)').option('--dev-port <port>', 'webpack-dev-server listen port (default: 3000)').option('--dev-listen <host>', 'webpack-dev-server listen host (default: 0.0.0.0)').option('--open', 'Open the browser when the SSR server starts. Use --no-open to disable. (default: true)').option('--inspect [port]', 'Enable the V8 inspector on the SSR server. Optionally specify a port (default: 9229)').option('--inspect-brk [port]', 'Enable the V8 inspector and break before the script starts — useful for debugging server startup. Optionally specify a port (default: 9229). Takes precedence over --inspect.').action(runDev);
cli.help();
cli.parse();
if (!cli.matchedCommand) {
  cli.outputHelp();
  process.exit(1);
}
//# sourceMappingURL=build.js.map
