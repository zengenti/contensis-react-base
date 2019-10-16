/* eslint-disable no-console */
var env = process.env.start || process.env.npm_config_start;
var script = env ? './server/start.' + env : './server/start';
console.log('Starting with "' + script + '.js"');

try {
  require(script);
} catch (ex) {
  console.log(`Problem starting script '${script}'`);
  console.log(
    'It is likely there was no .env file included with the build that contained those parameters'
  );
}
