import React from 'react';
import { Link as Link$1 } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import 'immutable';
import 'query-string';
import { a as selectCurrentProject } from './routing-786c3bb0.js';
import { a as selectBuildNumber, b as selectCommitRef, s as selectVersionStatus } from './version-924cf045.js';
import mapJson, { jpath } from 'jsonpath-mapper';
export { jpath, default as mapJson } from 'jsonpath-mapper';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';
import { HashLink } from 'react-router-hash-link';

/**
 *
 * @param {object} json The source object we wish to transform
 * @param {object} template The mapping template we wish to apply to the source
 * object to generate the intended target object
 */

const useMapper = (json, template) => {
  return template ? mapJson(json || {}, template) : json;
};

const chooseMapperByFieldValue = (entry, mappers, field = 'sys.contentTypeId') => {
  const fieldValue = jpath(field, entry || {});
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
  return mapper ? mapJson(entry || {}, mapper) : entry;
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
    ...mapJson(composerItem.value || {}, mapper)
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
  project: state => selectCurrentProject(state),
  reverseProxyPaths: () => isDev ? REVERSE_PROXY_PATHS
  /* global REVERSE_PROXY_PATHS */
  : context.REVERSE_PROXY_PATHS || {},
  servers: () => isDev ? SERVERS
  /* global SERVERS */
  : context.SERVERS,
  version: {
    buildNumber: state => selectBuildNumber(state),
    commitRef: state => selectCommitRef(state),
    contensisVersionStatus: state => selectVersionStatus(state)
  }
};

const mapStateToVersionInfo = state => {
  const mappedProps = mapJson(state, versionInfoProps);
  return mappedProps;
};

const VersionInfoStyledTable = styled.table.withConfig({
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
    return React.createElement("span", {
      className: className
    }, children);
  }

  let newWindow = openInNewWindow ? '_blank' : '_self';
  uri = encodeURI(uri);

  if (newWindow != '_blank' && uri && uri.startsWith('/')) {
    if (uri.indexOf('#') > -1) {
      return React.createElement(HashLink, {
        className: className,
        download: download,
        onClick: onClick,
        title: title,
        to: uri
      }, children);
    }

    return React.createElement(Link$1, {
      className: className,
      download: download,
      onClick: onClick,
      title: title,
      to: uri
    }, children);
  } else {
    return React.createElement("a", {
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
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
  download: PropTypes.string,
  onClick: PropTypes.func,
  openInNewWindow: PropTypes.bool,
  title: PropTypes.string,
  uri: PropTypes.string
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
  return React.createElement(React.Fragment, null, React.createElement(VersionInfoStyledTable, null, React.createElement("thead", null, React.createElement("tr", null, React.createElement("td", {
    colSpan: 2
  }, React.createElement("h1", null, React.createElement(Link, {
    path: "/"
  }, "Version Information"))))), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("th", {
    colSpan: 2
  }, "Package detail")), React.createElement("tr", null, React.createElement("td", {
    className: "left"
  }, "Name"), React.createElement("td", null, packagejson.name)), React.createElement("tr", null, React.createElement("td", {
    className: "left"
  }, "Version"), React.createElement("td", null, packagejson.version)), React.createElement("tr", null, React.createElement("th", {
    colSpan: 2
  }, "Version info (state)")), React.createElement("tr", null, React.createElement("td", null, "Git repo url: "), React.createElement("td", null, React.createElement("a", {
    href: packagejson.repository,
    target: "_blank",
    rel: "noopener noreferrer"
  }, packagejson.repository))), React.createElement("tr", null, React.createElement("td", null, "Pipeline: "), React.createElement("td", null, React.createElement("a", {
    href: `${packagejson.repository}/pipelines/${version.buildNumber ? version.buildNumber : ''}`,
    target: "_blank",
    rel: "noopener noreferrer"
  }, version.buildNumber))), React.createElement("tr", null, React.createElement("td", null, "Commit: "), React.createElement("td", null, React.createElement("a", {
    href: `${packagejson.repository}/commit/${version.commitRef ? version.commitRef : ''}`,
    target: "_blank",
    rel: "noopener noreferrer"
  }, version.commitRef))), React.createElement("tr", null, React.createElement("td", null, "Project"), React.createElement("td", {
    className: project == 'unknown' ? 'red' : ''
  }, project)), React.createElement("tr", null, React.createElement("td", null, "Contensis version status: "), React.createElement("td", {
    className: version.contensisVersionStatus == 'published' ? 'green' : 'red'
  }, version.contensisVersionStatus)), React.createElement("tr", null, React.createElement("th", {
    colSpan: 2
  }, "Build configuration")), React.createElement("tr", null, React.createElement("td", null, "Environment"), React.createElement("td", null, servers.alias)), React.createElement("tr", null, React.createElement("td", null, "Public uri"), React.createElement("td", null, publicUri)), React.createElement("tr", null, React.createElement("td", null, "Contensis package versions"), React.createElement("td", null, contensisPackageVersions.map(([pkg, ver], idx) => React.createElement("div", {
    key: idx
  }, pkg, ": ", ver)))), React.createElement("tr", null, React.createElement("td", null, "Servers"), React.createElement("td", {
    className: "small"
  }, React.createElement("div", null, "web: ", servers.web), React.createElement("div", null, "preview: ", servers.previewWeb), React.createElement("div", null, "api: ", servers.api), React.createElement("div", null, "cms: ", servers.cms), React.createElement("div", null, "iis: ", servers.iis), React.createElement("div", null, "iis preview: ", servers.previewIis))), React.createElement("tr", null, React.createElement("td", null, "Reverse proxy paths"), React.createElement("td", null, Object.entries(reverseProxyPaths).map(([, path], key) => React.createElement("span", {
    key: key
  }, "[ ", path, " ] ")))), React.createElement("tr", null, React.createElement("td", null, "Projects"), React.createElement("td", null, Object.entries(projects).map(([, project], key) => React.createElement("div", {
    key: key
  }, "[ ", project.id, ": ", project.publicUri, " ]")))), React.createElement("tr", null, React.createElement("td", null, "Delivery API"), React.createElement("td", {
    className: "small"
  }, React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0
    }
  }, Object.entries(deliveryApi).map(([key, value], idx) => {
    if (typeof value === 'object') return null;
    return React.createElement("li", {
      key: idx,
      style: {
        listStyleType: 'none'
      }
    }, key, ": ", React.createElement("span", null, value));
  })))), React.createElement("tr", null, React.createElement("td", null, "Proxy Delivery API requests"), React.createElement("td", {
    className: proxyDeliveryApi ? 'green' : 'red'
  }, proxyDeliveryApi.toString())), React.createElement("tr", null, React.createElement("td", null, "Disable SSR inline-redux"), React.createElement("td", null, disableSsrRedux.toString())), React.createElement("tr", null, React.createElement("td", null, "NODE_ENV"), React.createElement("td", {
    className: nodeEnv === 'production' ? 'green' : 'red'
  }, nodeEnv.toString())), devEnv && React.createElement("tr", null, React.createElement("td", null, "process.env"), React.createElement("td", null, Object.entries(devEnv).map(([k, v], key) => React.createElement("div", {
    key: key
  }, "[ ", k, ": ", v, " ]")))))));
};

VersionInfo.propTypes = {
  contensisPackageVersions: PropTypes.array,
  deliveryApi: PropTypes.object,
  devEnv: PropTypes.object,
  disableSsrRedux: PropTypes.bool,
  nodeEnv: PropTypes.string,
  packagejson: PropTypes.object,
  project: PropTypes.string,
  projects: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  proxyDeliveryApi: PropTypes.bool,
  publicUri: PropTypes.string,
  reverseProxyPaths: PropTypes.array,
  servers: PropTypes.object,
  version: PropTypes.object
};
var VersionInfo$1 = hot(module)(connect(mapStateToVersionInfo)(VersionInfo));

export { VersionInfo$1 as VersionInfo, mapComposer, mapEntries, setCachingHeaders_1 as setCachingHeaders, stringifyStrings_1 as stringifyStrings, urls, useComposerMapper, useEntriesMapper, useEntryMapper, useMapper };
//# sourceMappingURL=util.js.map
