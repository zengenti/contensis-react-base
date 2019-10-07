/* eslint-disable no-console */
var env = process.env.start || process.env.npm_config_start;
var script = env ? './server/start.' + env : './server/start';
console.log('Starting with "' + script + '.js"');

require(script);
