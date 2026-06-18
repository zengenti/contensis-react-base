#!/usr/bin/env node

import { cac } from 'cac';
import { runDev } from './dev-server';

const cli = cac('crb');

// Dev subcommand
cli
  .command('dev', 'Start the SSR dev server pipeline')
  .option(
    '--config <path>',
    'Path to webpack config file (default: webpack.config.js)'
  )
  .option(
    '--globals-path <path>',
    'Path to runtime globals shim file (default: webpack/define-config.js)'
  )
  .option('--env-file <path>', 'Path to .env file (default: .env)')
  .option(
    '--dev-host <host>',
    'webpack publicPath / HMR host (default: localhost)'
  )
  .option('--dev-port <port>', 'webpack-dev-server listen port (default: 3000)')
  .option(
    '--dev-listen <host>',
    'webpack-dev-server listen host (default: 0.0.0.0)'
  )
  .option(
    '--open',
    'Open the browser when the SSR server starts. Use --no-open to disable. (default: true)'
  )
  .option(
    '--inspect [port]',
    'Enable the V8 inspector on the SSR server. Optionally specify a port (default: 9229)'
  )
  .option(
    '--inspect-brk [port]',
    'Enable the V8 inspector and break before the script starts — useful for debugging server startup. Optionally specify a port (default: 9229). Takes precedence over --inspect.'
  )
  .action(runDev);

cli.help();

cli.parse();
if (!cli.matchedCommand) {
  cli.outputHelp();
  process.exit(1);
}
