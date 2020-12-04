const fs = require('fs-extra');
const path = require('path');

/* eslint-disable no-console */

const submoduleResolvePlugin = () => ({
  name: 'submodule-resolve-plugin',
  buildStart: options => {
    console.log(options.input);
    Object.entries(options.input).map(([bundle], idx) => {
      // For every bundle in options input, except
      // for the first (main) bundle, produce a
      // {submodule}/package.json file and folder to direct
      // submodule imports to the correct bundle
      if (idx !== 0) {
        const packagejson = `{
  "main": "../cjs/${bundle}.js",
  "module": "../esm/${bundle}.js"
}`;

        fs.mkdirpSync(path.join(__dirname, `../${bundle}/`));
        fs.writeFileSync(
          path.join(__dirname, `../${bundle}/package.json`),
          packagejson
        );

        console.log(`submodule-resolve-plugin wrote ./${bundle}/package.json`);
        //console.log(packagejson);
      }
    });
  },
});

export default submoduleResolvePlugin;
