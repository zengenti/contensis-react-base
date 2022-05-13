'use strict';

var React = require('react');
var reactRedux = require('react-redux');
var mapJson = require('jsonpath-mapper');
var selectors = require('./selectors-656da4b7.js');
var version = require('./version-eba6d09b.js');
var styled = require('styled-components');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var mapJson__default = /*#__PURE__*/_interopDefaultLegacy(mapJson);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

const setCachingHeaders = (response, {
  cacheControl = 'private',
  surrogateControl = '3600'
}, method = 'header') => {
  if (cacheControl) response[method]('Cache-Control', cacheControl);
  if (surrogateControl) response[method]('Surrogate-Control', `max-age=${surrogateControl.toString()}`);
};

const context = typeof window != 'undefined' ? window : global;
const isDev = process.env.NODE_ENV === 'development';

const pj = () => isDev ? PACKAGE_JSON
/* global PACKAGE_JSON */
: context.PACKAGE_JSON || {
  name: 'packagejson not found',
  repository: ''
};

const versionInfoProps = {
  packageDetail: () => {
    const pkg = pj();
    return {
      name: pkg.name,
      version: pkg.version,
      repository: pkg.repository
    };
  },
  uris: {
    gitRepo: () => pj().repository,
    commit: state => {
      const commitRef = version.selectCommitRef(state);
      return `${pj().repository}/commit/${commitRef ? commitRef : ''}`;
    },
    pipeline: state => {
      const buildNumber = version.selectBuildNumber(state);
      return `${pj().repository}/${pj().repository.includes('github.com') ? 'actions/runs' : 'pipelines'}/${buildNumber ? buildNumber : ''}`;
    }
  },
  zenPackageVersions: () => [...(Object.entries(pj().devDependencies || {}).filter(([pkg]) => pkg.includes('zengenti') || pkg.includes('contensis')) || []), ...(Object.entries(pj().dependencies || {}).filter(([pkg]) => pkg.includes('zengenti') || pkg.includes('contensis')) || [])],
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
  packagejson: () => pj() || {},
  projects: () => isDev ? PROJECTS
  /* global PROJECTS */
  : context.PROJECTS,
  proxyDeliveryApi: () => isDev ? PROXY_DELIVERY_API
  /* global PROXY_DELIVERY_API */
  : context.PROXY_DELIVERY_API || false,
  publicUri: () => isDev ? PUBLIC_URI
  /* global PUBLIC_URI */
  : context.PUBLIC_URI || null,
  project: state => selectors.selectCurrentProject(state),
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
  const mappedProps = mapJson__default["default"](state, versionInfoProps);
  return mappedProps;
};

const VersionInfoStyledTable = styled__default["default"].table.withConfig({
  displayName: "VersionInfostyled__VersionInfoStyledTable",
  componentId: "sc-ogujr7-0"
})(["font-family:'Source Sans Pro',Helvetica,Arial,sans-serif;font-size:1.6rem;line-height:1.5rem;border-bottom:4px solid #8892bf;border-collapse:separate;margin:0 auto;width:80%;th{text-align:left;background-color:#c4c9df;border-bottom:#8892bf 2px solid;border-bottom-color:#8892bf;border-top:20px solid #fff;}td{border-bottom:1px solid #eee;}td,th{padding:0.5rem 0.75rem;vertical-align:top;}.left{width:25%;}tr th{border-right:hidden;border-spacing:0 15px;}.green{background-color:#9c9;border-bottom:1px solid #696;}.red{background-color:#c99;border-bottom:1px solid #966;}.small{font-size:100%;line-height:2.4rem;}"]);

const VersionInfo = ({
  deliveryApi,
  devEnv,
  disableSsrRedux,
  nodeEnv,
  packageDetail,
  project,
  projects,
  proxyDeliveryApi,
  publicUri,
  reverseProxyPaths,
  servers,
  uris,
  version,
  zenPackageVersions
}) => {
  return /*#__PURE__*/React__default["default"].createElement(VersionInfoStyledTable, null, /*#__PURE__*/React__default["default"].createElement("thead", null, /*#__PURE__*/React__default["default"].createElement("tr", null, /*#__PURE__*/React__default["default"].createElement("td", {
    colSpan: 2
  }, /*#__PURE__*/React__default["default"].createElement("h1", null, /*#__PURE__*/React__default["default"].createElement("a", {
    href: "/"
  }, "Version Information"))))), /*#__PURE__*/React__default["default"].createElement("tbody", null, /*#__PURE__*/React__default["default"].createElement("tr", null, /*#__PURE__*/React__default["default"].createElement("th", {
    colSpan: 2
  }, "Package detail")), /*#__PURE__*/React__default["default"].createElement("tr", null, /*#__PURE__*/React__default["default"].createElement("td", {
    className: "left"
  }, "Name"), /*#__PURE__*/React__default["default"].createElement("td", null, packageDetail.name)), /*#__PURE__*/React__default["default"].createElement("tr", null, /*#__PURE__*/React__default["default"].createElement("td", {
    className: "left"
  }, "Version"), /*#__PURE__*/React__default["default"].createElement("td", null, packageDetail.version)), /*#__PURE__*/React__default["default"].createElement("tr", null, /*#__PURE__*/React__default["default"].createElement("th", {
    colSpan: 2
  }, "Version info (state)")), /*#__PURE__*/React__default["default"].createElement("tr", null, /*#__PURE__*/React__default["default"].createElement("td", null, "Git repo url: "), /*#__PURE__*/React__default["default"].createElement("td", null, /*#__PURE__*/React__default["default"].createElement("a", {
    href: packageDetail.repository,
    target: "_blank",
    rel: "noopener noreferrer"
  }, packageDetail.repository))), /*#__PURE__*/React__default["default"].createElement("tr", null, /*#__PURE__*/React__default["default"].createElement("td", null, "Pipeline: "), /*#__PURE__*/React__default["default"].createElement("td", null, /*#__PURE__*/React__default["default"].createElement("a", {
    href: uris.pipeline,
    target: "_blank",
    rel: "noopener noreferrer"
  }, version.buildNumber))), /*#__PURE__*/React__default["default"].createElement("tr", null, /*#__PURE__*/React__default["default"].createElement("td", null, "Commit: "), /*#__PURE__*/React__default["default"].createElement("td", null, /*#__PURE__*/React__default["default"].createElement("a", {
    href: uris.commit,
    target: "_blank",
    rel: "noopener noreferrer"
  }, version.commitRef))), /*#__PURE__*/React__default["default"].createElement("tr", null, /*#__PURE__*/React__default["default"].createElement("td", null, "Project"), /*#__PURE__*/React__default["default"].createElement("td", {
    className: project === 'unknown' ? 'red' : ''
  }, project)), /*#__PURE__*/React__default["default"].createElement("tr", null, /*#__PURE__*/React__default["default"].createElement("td", null, "Contensis version status: "), /*#__PURE__*/React__default["default"].createElement("td", {
    className: version.contensisVersionStatus === 'published' ? 'green' : 'red'
  }, version.contensisVersionStatus)), /*#__PURE__*/React__default["default"].createElement("tr", null, /*#__PURE__*/React__default["default"].createElement("th", {
    colSpan: 2
  }, "Build configuration")), /*#__PURE__*/React__default["default"].createElement("tr", null, /*#__PURE__*/React__default["default"].createElement("td", null, "Environment"), /*#__PURE__*/React__default["default"].createElement("td", null, servers.alias)), /*#__PURE__*/React__default["default"].createElement("tr", null, /*#__PURE__*/React__default["default"].createElement("td", null, "Public uri"), /*#__PURE__*/React__default["default"].createElement("td", null, publicUri)), /*#__PURE__*/React__default["default"].createElement("tr", null, /*#__PURE__*/React__default["default"].createElement("td", null, "Zengenti packages"), /*#__PURE__*/React__default["default"].createElement("td", null, zenPackageVersions.map(([pkg, ver], idx) => /*#__PURE__*/React__default["default"].createElement("div", {
    key: idx
  }, pkg, ": ", ver)))), /*#__PURE__*/React__default["default"].createElement("tr", null, /*#__PURE__*/React__default["default"].createElement("td", null, "Servers"), /*#__PURE__*/React__default["default"].createElement("td", {
    className: "small"
  }, /*#__PURE__*/React__default["default"].createElement("div", null, "web: ", servers.web), /*#__PURE__*/React__default["default"].createElement("div", null, "preview: ", servers.previewWeb), /*#__PURE__*/React__default["default"].createElement("div", null, "api: ", servers.api), /*#__PURE__*/React__default["default"].createElement("div", null, "cms: ", servers.cms), /*#__PURE__*/React__default["default"].createElement("div", null, "iis: ", servers.iis), /*#__PURE__*/React__default["default"].createElement("div", null, "iis preview: ", servers.previewIis))), /*#__PURE__*/React__default["default"].createElement("tr", null, /*#__PURE__*/React__default["default"].createElement("td", null, "Reverse proxy paths"), /*#__PURE__*/React__default["default"].createElement("td", null, Object.entries(reverseProxyPaths).map(([, path], key) => /*#__PURE__*/React__default["default"].createElement("span", {
    key: key
  }, "[ ", path, " ] ")))), /*#__PURE__*/React__default["default"].createElement("tr", null, /*#__PURE__*/React__default["default"].createElement("td", null, "Projects"), /*#__PURE__*/React__default["default"].createElement("td", null, Object.entries(projects).map(([, project], key) => /*#__PURE__*/React__default["default"].createElement("div", {
    key: key
  }, "[ ", project.id, ": ", project.publicUri, " ]")))), /*#__PURE__*/React__default["default"].createElement("tr", null, /*#__PURE__*/React__default["default"].createElement("td", null, "Delivery API"), /*#__PURE__*/React__default["default"].createElement("td", {
    className: "small"
  }, /*#__PURE__*/React__default["default"].createElement("ul", {
    style: {
      margin: 0,
      padding: 0
    }
  }, Object.entries(deliveryApi).map(([key, value], idx) => {
    if (typeof value === 'object') return null;
    return /*#__PURE__*/React__default["default"].createElement("li", {
      key: idx,
      style: {
        listStyleType: 'none'
      }
    }, key, ": ", /*#__PURE__*/React__default["default"].createElement("span", null, value));
  })))), /*#__PURE__*/React__default["default"].createElement("tr", null, /*#__PURE__*/React__default["default"].createElement("td", null, "Proxy Delivery API requests"), /*#__PURE__*/React__default["default"].createElement("td", {
    className: proxyDeliveryApi ? 'green' : 'red'
  }, proxyDeliveryApi.toString())), /*#__PURE__*/React__default["default"].createElement("tr", null, /*#__PURE__*/React__default["default"].createElement("td", null, "Disable SSR inline-redux"), /*#__PURE__*/React__default["default"].createElement("td", null, disableSsrRedux.toString())), /*#__PURE__*/React__default["default"].createElement("tr", null, /*#__PURE__*/React__default["default"].createElement("td", null, "NODE_ENV"), /*#__PURE__*/React__default["default"].createElement("td", {
    className: nodeEnv === 'production' ? 'green' : 'red'
  }, nodeEnv.toString())), devEnv && /*#__PURE__*/React__default["default"].createElement("tr", null, /*#__PURE__*/React__default["default"].createElement("td", null, "process.env"), /*#__PURE__*/React__default["default"].createElement("td", null, Object.entries(devEnv).map(([k, v], key) => /*#__PURE__*/React__default["default"].createElement("div", {
    key: key
  }, "[ ", k, ": ", v, " ]"))))));
};

var VersionInfo$1 = reactRedux.connect(mapStateToVersionInfo)(VersionInfo);

exports.VersionInfo = VersionInfo$1;
exports.setCachingHeaders = setCachingHeaders;
//# sourceMappingURL=VersionInfo-4c9dfa6a.js.map
