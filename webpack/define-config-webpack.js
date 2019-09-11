const packagejson = require('../package.json');
module.exports = {
  base: {
    DISABLE_SSR_REDUX: false,
    VERSION: JSON.stringify(packagejson.version),
    HOME_ENTRY: JSON.stringify('33479a87-7069-4220-9b0c-220318bd3345'),
    PUBLIC_URI: JSON.stringify('https://live-uni-demo.cloud.contensis.com'),
    DELIVERY_API_CONFIG: {
      rootUrl: JSON.stringify('https://live-uni-demo.cloud.contensis.com'),
      accessToken: JSON.stringify(
        'ppER5snmMgnDicH7ehoSceX6vC5EDbS9mbnNWFDNa3Lu2Zsd'
      ),
      projectId: JSON.stringify('website'),
    },
  },
  dev: {
    __isBrowser__: 'true',
  },
  prod: {
    __isBrowser__: 'false',
  },
};
