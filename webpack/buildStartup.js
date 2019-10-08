/* eslint-disable no-console */

const fs = require('fs');
const dotenv = require('dotenv');
const path = require('path');
const packagejson = require('../package.json');

const _module = path.basename(__filename);

const envs = [];

function readDotEnvFiles() {
  fs.readdirSync(process.cwd()).forEach(filename => {
    if (filename.startsWith('.env')) {
      envs.push(filename);
    }
  });
}

function loadConfig(env) {
  console.log('Found environment in: "' + env + '"');

  // read values from .env file and set process.env.*
  var envConfig = dotenv.parse(fs.readFileSync(env));
  process.env.dotenv = env;
  return envConfig;
}

function readModuleFileSync(path) {
  try {
    // read the file and pass to callback
    var filename = require.resolve(path);
    return fs.readFileSync(filename, 'utf8');
  } catch (e) {
    console.log(e);
  }
}

function makeReplacements(config, template) {
  // replace template with stringified values from process.env.*
  return template
    .replace(/ALIAS/g, JSON.stringify(config.ALIAS))
    .replace(/INTERNAL_VIP/g, JSON.stringify(config.INTERNAL_VIP))
    .replace(/ACCESS_TOKEN/g, JSON.stringify(config.ACCESS_TOKEN))
    .replace(/PROJECT/g, JSON.stringify(config.PROJECT))
    .replace(/PUBLIC_URL/g, JSON.stringify(config.PUBLIC_URL));
}

function mkdirp(filepath) {
  var dirname = path.dirname(filepath);

  if (!fs.existsSync(dirname)) {
    mkdirp(dirname);
  }

  if (!fs.existsSync(filepath)) {
    fs.mkdirSync(filepath);
  }
}

function writeModuleFileSync(filename, contents) {
  try {
    mkdirp(path.dirname(filename));
    fs.writeFileSync(filename, contents);
    console.log('--', 'Created "' + filename + '"');
  } catch (e) {
    console.log('--', 'Problem writing file: "' + filename + '"', e);
  }
}

try {
  console.log('/* ', _module, '*/');

  // read all files in root called .env* and create separate
  // startup files for all configured environments, so the production
  // bundles can be started with any of these scripts
  readDotEnvFiles();

  // the base startup template we are going to make environment specific
  // replacements on
  var template = readModuleFileSync('../src/server/start/startup.template.js');

  envs.forEach(env => {
    // for each env we will load the .env.* file into process.env.* variables
    // then make replacements to the template
    var config = loadConfig(env);
    var startup = makeReplacements(config, template);

    if (process.env.dotenv == '.env') {
      // write the 'default' project startup (.env) as just start.js
      // so it is ready to launch with just a default server start script
      // and serve a default client bundle
      writeModuleFileSync('dist/server/start.js', startup);
      writeModuleFileSync('dist/static/startup.js', startup);

      // write another start script which matches the project name
      // e.g. dist/server/start.zen-base.js
      writeModuleFileSync(
        'dist/server/start.' + packagejson.name + '.js',
        startup
      );
    }

    // write a startup.alias.js file for the environment alias read from
    // the .env.* file so the script can be used to start the server
    // and serve the bundle configuration for that specific environment
    writeModuleFileSync('dist/server/start.' + config.ALIAS + '.js', startup);
  });

  console.log('Deploying server start scripts');
  fs.copyFileSync('src/server/start/start.js', 'dist/start.js');
  fs.copyFileSync(
    'src/server/start/startup.utils.js',
    'dist/server/startup.utils.js'
  );

  console.log(_module, 'completed successfully');
} catch (e) {
  console.log(_module, 'encountered a problem: ', e.stack);
}
