'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var reactRouterDom = require('react-router-dom');
var reactRedux = require('react-redux');
var styled = require('styled-components');
require('immutable');
require('query-string');
var routing = require('./routing-5db2c867.js');
var version = require('./version-2f3078fa.js');
var mapJson = require('jsonpath-mapper');
var reactHotLoader = require('react-hot-loader');
var PropTypes = require('prop-types');
var reactRouterHashLink = require('react-router-hash-link');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);
var mapJson__default = /*#__PURE__*/_interopDefaultLegacy(mapJson);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

/**
 *
 * @param {object} json The source object we wish to transform
 * @param {object} template The mapping template we wish to apply to the source
 * object to generate the intended target object
 */

const useMapper = (json, template) => {
  return template ? mapJson__default['default'](json || {}, template) : json;
};

const chooseMapperByFieldValue = (entry, mappers, field = 'sys.contentTypeId') => {
  const fieldValue = mapJson.jpath(field, entry || {});
  return mappers[fieldValue] || mappers['default'] || {};
};
/**
 * useEntriesMapper hook to take a list of entries from Delivery API along
 * with mappers for each contentTypeId and return an array of mapped objects
 * @param {any} entry The source entry we wish to transform
 * @param {object} mappers Object with keys containing mapper templates,
 * the key name matching sys.contentTypeId
 * @param {string} field Only include if we need to match content based on
 * a field other than sys.contentTypeId in the source data
 * @returns {object} Object transformed using a matched content type or
 * a default mapper template, returns an empty object if no mapper template
 * couild be applied.
 */


const useEntriesMapper = (entry, mappers, field = 'sys.contentTypeId') => {
  const mapper = chooseMapperByFieldValue(entry, mappers, field);
  return useMapper(entry || {}, mapper);
};
/**
 * Deprecated: due to misleading name, use the hook useEntriesMapper instead
 */

const useEntryMapper = useEntriesMapper;
/**
 * mapEntries mapping function to take a list of entries from Delivery API along
 * with mappers for each contentTypeId and return an array of mapped objects
 * @param {any} entry The source entry we wish to transform
 * @param {object} mappers Object with keys containing mapper templates,
 * the key name matching sys.contentTypeId
 * @param {string} field Only include if we need to match content based on
 * a field other than sys.contentTypeId in the source data
 * @returns {object} Object transformed using a matched content type or
 * a default mapper template, returns an empty object if no mapper template
 * couild be applied.
 */

const mapEntries = (entries, mappers, field = 'sys.contentTypeId') => entries.map(entry => {
  const mapper = chooseMapperByFieldValue(entry, mappers, field);
  return mapper ? mapJson__default['default'](entry || {}, mapper) : entry;
});
/**
 * mapComposer mapping function to take a composer field from Delivery API along
 * with mappers for each Composer Item "type" and return an array of mapped components
 * @param {array} composer Composer field array of Composer Items
 * @param {object} mappers A keyed object with each key matching the Composer Item "type"
 * @returns {array} Array of mapped objects transformed using a matched Composer Item "type" mapping
 * or null. Injects a "_type" property into each transformed object in the array to indicate
 * where the mapping originated and for what component the mapped object is representing
 */

const mapComposer = (composer, mappers) => Array.isArray(composer) ? composer.map(composerItem => {
  const fieldValue = composerItem.type;
  const mapper = mappers[fieldValue] || mappers['default'];
  return mapper ? {
    _type: fieldValue,
    ...mapJson__default['default'](composerItem.value || {}, mapper)
  } : composerItem;
}) : null;
/**
 * useComposerMapper hook to take a composer field from Delivery API along
 * with mappers for each Composer Item "type" and return an array of mapped components
 * @param {array} composer Composer field array of Composer Items
 * @param {object} mappers A keyed object with each key matching the Composer Item "type"
 * @returns {array} Array of mapped objects transformed using a matched Composer Item "type" mapping
 * or null. Injects a "_type" property into each transformed object in the array to indicate
 * where the mapping originated and for what component the mapped object is representing
 */

const useComposerMapper = (composer = [], mappers = {}) => mapComposer(composer, mappers);

const setCachingHeaders = (response, {
  cacheControl = 'private',
  surrogateControl = '3600'
}, method = 'header') => {
  if (cacheControl) response[method]('Cache-Control', cacheControl);
  if (surrogateControl) response[method]('Surrogate-Control', `max-age=${surrogateControl.toString()}`);
};

var setCachingHeaders_1 = setCachingHeaders;

const stringifyStrings = obj => {
  const returnObj = Array.isArray(obj) ? [] : {};
  Object.entries(obj).forEach(([key, value]) => {
    switch (typeof value) {
      case 'string':
        returnObj[key] = JSON.stringify(value);
        break;

      case 'object':
        returnObj[key] = stringifyStrings(value);
        break;

      default:
        returnObj[key] = value;
        break;
    }
  });
  return returnObj;
};

var stringifyStrings_1 = stringifyStrings;

const url = (alias, project) => {
  const projectAndAlias = project && project.toLowerCase() != 'website' ? `${project.toLowerCase()}-${alias}` : alias;
  return {
    api: `https://api-${alias}.cloud.contensis.com`,
    cms: `https://cms-${alias}.cloud.contensis.com`,
    liveWeb: `https://live-${projectAndAlias}.cloud.contensis.com`,
    previewWeb: `https://preview-${projectAndAlias}.cloud.contensis.com`,
    iisWeb: `https://iis-live-${projectAndAlias}.cloud.contensis.com`,
    iisPreviewWeb: `https://iis-preview-${projectAndAlias}.cloud.contensis.com`
  };
};

var urls = url;

const context = typeof window != 'undefined' ? window : global;
const isDev = process.env.NODE_ENV === 'development';

const packagejson = () => isDev ? PACKAGE_JSON
/* global PACKAGE_JSON */
: context.PACKAGE_JSON || {
  name: 'packagejson not found'
};

const versionInfoProps = {
  contensisPackageVersions: () => [...(Object.entries(packagejson().devDependencies || {}).filter(([pkg]) => pkg.includes('zengenti') || pkg.includes('contensis')) || []), ...(Object.entries(packagejson().dependencies || {}).filter(([pkg]) => pkg.includes('zengenti') || pkg.includes('contensis')) || [])],
  deliveryApi: () => JSON.parse(JSON.stringify(DELIVERY_API_CONFIG
  /* global DELIVERY_API_CONFIG */
  )),
  devEnv: () => typeof DEV_ENV !== 'undefined'
  /* global DEV_ENV */
  ? DEV_ENV : null,
  disableSsrRedux: () => isDev ? DISABLE_SSR_REDUX
  /* global DISABLE_SSR_REDUX*/
  : context.DISABLE_SSR_REDUX || false,
  nodeEnv: () => process.env.NODE_ENV || 'production',
  packagejson: () => packagejson() || {},
  projects: () => isDev ? PROJECTS
  /* global PROJECTS */
  : context.PROJECTS,
  proxyDeliveryApi: () => isDev ? PROXY_DELIVERY_API
  /* global PROXY_DELIVERY_API */
  : context.PROXY_DELIVERY_API || false,
  publicUri: () => isDev ? PUBLIC_URI
  /* global PUBLIC_URI */
  : context.PUBLIC_URI || null,
  project: state => routing.selectCurrentProject(state),
  reverseProxyPaths: () => isDev ? REVERSE_PROXY_PATHS
  /* global REVERSE_PROXY_PATHS */
  : context.REVERSE_PROXY_PATHS || {},
  servers: () => isDev ? SERVERS
  /* global SERVERS */
  : context.SERVERS,
  version: {
    buildNumber: state => version.selectBuildNumber(state),
    commitRef: state => version.selectCommitRef(state),
    contensisVersionStatus: state => version.selectVersionStatus(state)
  }
};

const mapStateToVersionInfo = state => {
  const mappedProps = mapJson__default['default'](state, versionInfoProps);
  return mappedProps;
};

const VersionInfoStyledTable = styled__default['default'].table.withConfig({
  displayName: "VersionInfostyled__VersionInfoStyledTable",
  componentId: "ocu0a9-0"
})(["font-family:'Source Sans Pro',Helvetica,Arial,sans-serif;font-size:1.6rem;line-height:1.5rem;border-bottom:4px solid #8892bf;border-collapse:separate;margin:0 auto;width:80%;th{text-align:left;background-color:#c4c9df;border-bottom:#8892bf 2px solid;border-bottom-color:#8892bf;border-top:20px solid #fff;}td{border-bottom:1px solid #eee;}td,th{padding:0.5rem 0.75rem;vertical-align:top;}.left{width:25%;}tr th{border-right:hidden;border-spacing:0 15px;}.green{background-color:#9c9;border-bottom:1px solid #696;}.red{background-color:#c99;border-bottom:1px solid #966;}.small{font-size:100%;line-height:2.4rem;}"]);

const Link = ({
  className = '',
  children,
  download,
  onClick,
  openInNewWindow,
  title,
  uri
}) => {
  className += ' Link';

  if (!uri) {
    return React__default['default'].createElement("span", {
      className: className
    }, children);
  }

  let newWindow = openInNewWindow ? '_blank' : '_self';
  uri = encodeURI(uri);

  if (newWindow != '_blank' && uri && uri.startsWith('/')) {
    if (uri.indexOf('#') > -1) {
      return React__default['default'].createElement(reactRouterHashLink.HashLink, {
        className: className,
        download: download,
        onClick: onClick,
        title: title,
        to: uri
      }, children);
    }

    return React__default['default'].createElement(reactRouterDom.Link, {
      className: className,
      download: download,
      onClick: onClick,
      title: title,
      to: uri
    }, children);
  } else {
    return React__default['default'].createElement("a", {
      className: className,
      download: download,
      href: uri,
      onClick: onClick,
      target: newWindow,
      title: title,
      rel: "noopener noreferrer"
    }, children);
  }
};

Link.propTypes = {
  className: PropTypes__default['default'].string,
  children: PropTypes__default['default'].oneOfType([PropTypes__default['default'].element, PropTypes__default['default'].node]),
  download: PropTypes__default['default'].string,
  onClick: PropTypes__default['default'].func,
  openInNewWindow: PropTypes__default['default'].bool,
  title: PropTypes__default['default'].string,
  uri: PropTypes__default['default'].string
};

const VersionInfo = ({
  contensisPackageVersions,
  deliveryApi,
  devEnv,
  disableSsrRedux,
  nodeEnv,
  servers,
  packagejson,
  project,
  projects,
  proxyDeliveryApi,
  publicUri,
  reverseProxyPaths,
  version
}) => {
  return React__default['default'].createElement(React__default['default'].Fragment, null, React__default['default'].createElement(VersionInfoStyledTable, null, React__default['default'].createElement("thead", null, React__default['default'].createElement("tr", null, React__default['default'].createElement("td", {
    colSpan: 2
  }, React__default['default'].createElement("h1", null, React__default['default'].createElement(Link, {
    path: "/"
  }, "Version Information"))))), React__default['default'].createElement("tbody", null, React__default['default'].createElement("tr", null, React__default['default'].createElement("th", {
    colSpan: 2
  }, "Package detail")), React__default['default'].createElement("tr", null, React__default['default'].createElement("td", {
    className: "left"
  }, "Name"), React__default['default'].createElement("td", null, packagejson.name)), React__default['default'].createElement("tr", null, React__default['default'].createElement("td", {
    className: "left"
  }, "Version"), React__default['default'].createElement("td", null, packagejson.version)), React__default['default'].createElement("tr", null, React__default['default'].createElement("th", {
    colSpan: 2
  }, "Version info (state)")), React__default['default'].createElement("tr", null, React__default['default'].createElement("td", null, "Git repo url: "), React__default['default'].createElement("td", null, React__default['default'].createElement("a", {
    href: packagejson.repository,
    target: "_blank",
    rel: "noopener noreferrer"
  }, packagejson.repository))), React__default['default'].createElement("tr", null, React__default['default'].createElement("td", null, "Pipeline: "), React__default['default'].createElement("td", null, React__default['default'].createElement("a", {
    href: `${packagejson.repository}/pipelines/${version.buildNumber ? version.buildNumber : ''}`,
    target: "_blank",
    rel: "noopener noreferrer"
  }, version.buildNumber))), React__default['default'].createElement("tr", null, React__default['default'].createElement("td", null, "Commit: "), React__default['default'].createElement("td", null, React__default['default'].createElement("a", {
    href: `${packagejson.repository}/commit/${version.commitRef ? version.commitRef : ''}`,
    target: "_blank",
    rel: "noopener noreferrer"
  }, version.commitRef))), React__default['default'].createElement("tr", null, React__default['default'].createElement("td", null, "Project"), React__default['default'].createElement("td", {
    className: project == 'unknown' ? 'red' : ''
  }, project)), React__default['default'].createElement("tr", null, React__default['default'].createElement("td", null, "Contensis version status: "), React__default['default'].createElement("td", {
    className: version.contensisVersionStatus == 'published' ? 'green' : 'red'
  }, version.contensisVersionStatus)), React__default['default'].createElement("tr", null, React__default['default'].createElement("th", {
    colSpan: 2
  }, "Build configuration")), React__default['default'].createElement("tr", null, React__default['default'].createElement("td", null, "Environment"), React__default['default'].createElement("td", null, servers.alias)), React__default['default'].createElement("tr", null, React__default['default'].createElement("td", null, "Public uri"), React__default['default'].createElement("td", null, publicUri)), React__default['default'].createElement("tr", null, React__default['default'].createElement("td", null, "Contensis package versions"), React__default['default'].createElement("td", null, contensisPackageVersions.map(([pkg, ver], idx) => React__default['default'].createElement("div", {
    key: idx
  }, pkg, ": ", ver)))), React__default['default'].createElement("tr", null, React__default['default'].createElement("td", null, "Servers"), React__default['default'].createElement("td", {
    className: "small"
  }, React__default['default'].createElement("div", null, "web: ", servers.web), React__default['default'].createElement("div", null, "preview: ", servers.previewWeb), React__default['default'].createElement("div", null, "api: ", servers.api), React__default['default'].createElement("div", null, "cms: ", servers.cms), React__default['default'].createElement("div", null, "iis: ", servers.iis), React__default['default'].createElement("div", null, "iis preview: ", servers.previewIis))), React__default['default'].createElement("tr", null, React__default['default'].createElement("td", null, "Reverse proxy paths"), React__default['default'].createElement("td", null, Object.entries(reverseProxyPaths).map(([, path], key) => React__default['default'].createElement("span", {
    key: key
  }, "[ ", path, " ] ")))), React__default['default'].createElement("tr", null, React__default['default'].createElement("td", null, "Projects"), React__default['default'].createElement("td", null, Object.entries(projects).map(([, project], key) => React__default['default'].createElement("div", {
    key: key
  }, "[ ", project.id, ": ", project.publicUri, " ]")))), React__default['default'].createElement("tr", null, React__default['default'].createElement("td", null, "Delivery API"), React__default['default'].createElement("td", {
    className: "small"
  }, React__default['default'].createElement("ul", {
    style: {
      margin: 0,
      padding: 0
    }
  }, Object.entries(deliveryApi).map(([key, value], idx) => {
    if (typeof value === 'object') return null;
    return React__default['default'].createElement("li", {
      key: idx,
      style: {
        listStyleType: 'none'
      }
    }, key, ": ", React__default['default'].createElement("span", null, value));
  })))), React__default['default'].createElement("tr", null, React__default['default'].createElement("td", null, "Proxy Delivery API requests"), React__default['default'].createElement("td", {
    className: proxyDeliveryApi ? 'green' : 'red'
  }, proxyDeliveryApi.toString())), React__default['default'].createElement("tr", null, React__default['default'].createElement("td", null, "Disable SSR inline-redux"), React__default['default'].createElement("td", null, disableSsrRedux.toString())), React__default['default'].createElement("tr", null, React__default['default'].createElement("td", null, "NODE_ENV"), React__default['default'].createElement("td", {
    className: nodeEnv === 'production' ? 'green' : 'red'
  }, nodeEnv.toString())), devEnv && React__default['default'].createElement("tr", null, React__default['default'].createElement("td", null, "process.env"), React__default['default'].createElement("td", null, Object.entries(devEnv).map(([k, v], key) => React__default['default'].createElement("div", {
    key: key
  }, "[ ", k, ": ", v, " ]")))))));
};

VersionInfo.propTypes = {
  contensisPackageVersions: PropTypes__default['default'].array,
  deliveryApi: PropTypes__default['default'].object,
  devEnv: PropTypes__default['default'].object,
  disableSsrRedux: PropTypes__default['default'].bool,
  nodeEnv: PropTypes__default['default'].string,
  packagejson: PropTypes__default['default'].object,
  project: PropTypes__default['default'].string,
  projects: PropTypes__default['default'].oneOfType([PropTypes__default['default'].object, PropTypes__default['default'].array]),
  proxyDeliveryApi: PropTypes__default['default'].bool,
  publicUri: PropTypes__default['default'].string,
  reverseProxyPaths: PropTypes__default['default'].array,
  servers: PropTypes__default['default'].object,
  version: PropTypes__default['default'].object
};
var VersionInfo$1 = reactHotLoader.hot(module)(reactRedux.connect(mapStateToVersionInfo)(VersionInfo));

Object.defineProperty(exports, 'jpath', {
  enumerable: true,
  get: function () {
    return mapJson.jpath;
  }
});
Object.defineProperty(exports, 'mapJson', {
  enumerable: true,
  get: function () {
    return mapJson__default['default'];
  }
});
exports.VersionInfo = VersionInfo$1;
exports.mapComposer = mapComposer;
exports.mapEntries = mapEntries;
exports.setCachingHeaders = setCachingHeaders_1;
exports.stringifyStrings = stringifyStrings_1;
exports.urls = urls;
exports.useComposerMapper = useComposerMapper;
exports.useEntriesMapper = useEntriesMapper;
exports.useEntryMapper = useEntryMapper;
exports.useMapper = useMapper;
//# sourceMappingURL=util.js.map
