const packagejson = require('../package.json');
module.exports = {
  DISABLE_SSR_REDUX: false,
  VERSION: packagejson.version,
  HOME_ENTRY: '33479a87-7069-4220-9b0c-220318bd3345',
  PUBLIC_URI: 'https://live-uni-demo.cloud.contensis.com',
  DELIVERY_API_CONFIG: {
    rootUrl: 'https://live-uni-demo.cloud.contensis.com',
    accessToken: 'ppER5snmMgnDicH7ehoSceX6vC5EDbS9mbnNWFDNa3Lu2Zsd',
    projectId: 'website',
  },
  __isBrowser__: false,
};
