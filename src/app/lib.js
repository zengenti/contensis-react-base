const internalServer = require('../server/internalServer').default;

exports.app = internalServer.app;
exports.httpProxy = internalServer.apiProxy;
exports.start = internalServer.start;

const ReactApp = require('~/App').default;

exports.ReactApp = ReactApp;
