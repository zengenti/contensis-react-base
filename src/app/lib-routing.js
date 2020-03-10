exports.types = require('~/core/redux/types/routing');
exports.actions = require('~/core/redux/actions/routing');
exports.selectors = require('~/core/redux/selectors/routing');

const ReactApp = require('~/App').default;
const RouteLoader = require('~/core/routes/RouteLoader').default;

exports.ReactApp = ReactApp;
exports.RouteLoader = RouteLoader;
