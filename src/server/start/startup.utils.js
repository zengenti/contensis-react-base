/* eslint-disable no-console */

module.exports = {
  startServer: function() {
    require('../server.js');
  },
  setDefaults: function(currentScript) {
    // in a server context check if we are using a standard or
    // targeted start script and write new defaults for a targeted startup
    var path = require('path');
    var defaultScript = path.dirname(currentScript) + '/start.js';
    if (path.resolve(currentScript) != path.resolve(defaultScript)) {
      var fs = require('fs');
      try {
        // in a server context we copy the current (targeted) start script
        // to be the default so we can serve a static startup bundle to the client
        // and start the server with default scripts pre-targeted
        fs.copyFileSync(
          currentScript,
          path.dirname(path.dirname(currentScript)) + '/static/startup.js'
        );
        fs.copyFileSync(
          currentScript,
          path.dirname(currentScript) + '/start.js'
        );
      } catch (err) {
        console.log(err);
      }
    }
  },
};
