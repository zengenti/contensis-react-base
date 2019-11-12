import fs from 'fs';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import Loadable from 'react-loadable';
import App from '~/App';

import createStore from '~/core/redux/store';
import rootSaga from '~/core/redux/sagas';
import { setCurrentProject } from '~/core/redux/actions/routing';
import { setVersion, setVersionStatus } from '~/core/redux/actions/version';
import { selectNavigationDepends } from '~/core/redux/selectors/navigation';
import {
  selectRouteEntryDepends,
  selectRouteEntry,
  selectCurrentProject,
} from '~/core/redux/selectors/routing';
import { GetDeliveryApiStatusFromHostname } from '~/core/util/ContensisDeliveryApi';

const versionData = fs.readFileSync('dist/static/version.json', 'utf8');
const versionInfo = JSON.parse(versionData);
const templateHTML = fs.readFileSync('dist/index.html', 'utf8');
const templateHTMLStatic = fs.readFileSync('dist/index_static.html', 'utf8');
const templateHTMLFragment = fs.readFileSync(
  'dist/index_fragment.html',
  'utf8'
);
const stats = JSON.parse(fs.readFileSync('dist/static/react-loadable.json'));
const packagejson = require('../../package.json');

const selectors = {
  selectRouteEntry,
  selectRouteEntryDepends,
  selectCurrentProject,
  selectNavigationDepends,
};

const actions = {
  setCurrentProject,
  setVersion,
  setVersionStatus,
};

const helpers = { GetDeliveryApiStatusFromHostname };

const templates = { templateHTML, templateHTMLStatic, templateHTMLFragment };

const version = { versionData, versionInfo };

// Configure any server-side features such as sitemap or REST api's
import ConfigureFeatures from './features/configure';

// import ZengentiAppServer from '~/lib';
import ZengentiAppServer from '../../lib/zengenti-appserver-package';

const jsx = options => {
  const context = {};
  return (
    <Loadable.Capture report={moduleName => options.modules.push(moduleName)}>
      <ReduxProvider store={options.store}>
        <StaticRouter context={context} location={options.url}>
          <App />
        </StaticRouter>
      </ReduxProvider>
    </Loadable.Capture>
  );
};

ZengentiAppServer.start({
  ConfigureFeatures,
  jsx,
  createStore,
  rootSaga,
  selectors,
  actions,
  helpers,
  templates,
  version,
  stats,
  packagejson,
  dynamicPaths: [],
  servers: SERVERS /* global SERVERS */,
  projects: PROJECTS /* global PROJECTS */,
  reverseProxyPaths: REVERSE_PROXY_PATHS /* global REVERSE_PROXY_PATHS */,
});

ZengentiAppServer.app.emit('ready');
