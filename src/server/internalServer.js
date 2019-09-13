import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import serialize from 'serialize-javascript';
import minifyCssString from 'minify-css-string';
import React from 'react';
import Helmet from 'react-helmet';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import { ServerStyleSheet } from 'styled-components';
import { Provider as ReduxProvider } from 'react-redux';
import 'isomorphic-fetch';

import rootSaga from '~/core/redux/sagas';
import httpProxy from 'http-proxy';
import evilDns from 'evil-dns';
const templateHTML = fs.readFileSync('dist/index.html', 'utf8');
const versionData = fs.readFileSync('dist/static/version.json', 'utf8');
const versionInfo = JSON.parse(versionData);
const templateHTMLFragment = fs.readFileSync(
  'dist/index_fragment.html',
  'utf8'
);
const templateHTMLStatic = fs.readFileSync('dist/index_static.html', 'utf8');
const stats = JSON.parse(fs.readFileSync('dist/static/react-loadable.json'));
import { setVersion, setVersionStatus } from '~/core/redux/actions/version';
import { initialiseApp } from '~/core/redux/actions/app';

import App from '~/App';
import createStore from '~/core/redux/store';

import { GetDeliveryApiStatusFromHostname } from '~/core/util/ContensisDeliveryApi';
import { loadNavigationTree } from '~/core/redux/actions/navigation';
//import { setServerSideBasePath } from '../app/redux/actions/routing';
import generateSiteMap from './siteMapGenerator';
import { selectNavigationDepends } from '~/core/redux/selectors/navigation';
import { selectRouteEntryDepends } from '~/core/redux/selectors/routing';

export const app = express();
app.disable('x-powered-by');
app.use(bodyParser.json());

const addStandardHeaders = (state, response) => {
  if (state) {
    /* eslint-disable no-console */
    try {
      console.log('About to add header');
      let navDepends = selectNavigationDepends(state);
      let recordDepends = selectRouteEntryDepends(state);
      //navDepends = navDepends.toJS();
      navDepends = [];
      recordDepends = recordDepends.toJS();
      console.log(`NavDepends Count: ${navDepends.length}`);
      console.log(`recordDepends Count: ${recordDepends.length}`);
      const allDepends = [...navDepends, ...recordDepends];
      let allDependsHeaderValue = allDepends.join(' ');
      allDependsHeaderValue = ` improbable-demo-app ${allDependsHeaderValue} improbable-demo-app`;
      response.header('surrogate-key', allDependsHeaderValue);
    } catch (e) {
      console.log('Error Adding headers');
      console.log(e);
    }
  }
  response.setHeader('Surrogate-Control', 'max-age=3600');
};

// Configure DNS to make live easy

const environmentAlias = 'uni-demo';
let internalVip = '10.128.73.132';
const disableDnsChanges = false;

// Break api.ipify to test
// evilDns.add('api.ipify.org', '8.8.8.8');
const configureLocalEndpoint = () => {
  if (!disableDnsChanges) {
    evilDns.add(`*${environmentAlias}.cloud.contensis.com`, internalVip);
    //evilDns.add(`${environmentAlias}.cloud.contensis.com`, internalVip);
  }
};
/* eslint-disable no-console */
fetch('https://api.ipify.org?format=json', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then(
    response => {
      return response.json();
    },
    error => {
      console.log(
        `Could Not work out where I am so defaulting to localDNS, as If i am probably running as a container this is what matters most. Not Developers at home or tests :( Sorry. error: ${error}`
      );
      configureLocalEndpoint();
    }
  )
  .then(ipJson => {
    console.log(`current Public ip = ${JSON.stringify(ipJson)}`);
    if (ipJson.ip.startsWith('185.18.13')) {
      console.log(
        `using Local Enpoint for ${environmentAlias} -> ${internalVip}`
      );
      configureLocalEndpoint();
    } else {
      console.log(`Outside Zengenti Network use real DNS.`);
    }
  })
  .catch(error => {
    configureLocalEndpoint();
    console.log(
      `Could Not work out where I am so defaulting to localDNS, as If i am probably running as a container this is what matters most. Not Developers at home or tests :( Sorry. error: ${error}`
    );
  });
/* eslint-enable no-console */

var apiProxy = httpProxy.createProxyServer();
var liveServer = 'https://live-uni-demo.cloud.contensis.com';
var iisServer = 'https://iis-live-uni-demo.cloud.contensis.com';

// This is just here to stop cors requests on localhost. In Production this is mapped using varnish.
app.all(['/api/*'], function(req, res) {
  /* eslint-disable no-console */
  console.log('redirecting to Server1');
  apiProxy.web(req, res, { target: liveServer, changeOrigin: true });
  apiProxy.on('error', e => {
    /* eslint-disable no-console */
    console.log(
      `Proxy Request for ${req.path} HostName:${req.hostname} failed with ${e}`
    );
    /* eslint-enable no-console */
  });
});

app.all(['/image-library/*', '/video-library/*', '/asset-library/*'], function(
  req,
  res
) {
  apiProxy.web(req, res, { target: iisServer, changeOrigin: true });
  apiProxy.on('error', e => {
    /* eslint-disable no-console */
    console.log(
      `Proxy Request for ${req.path} HostName:${req.hostname} failed with ${e}`
    );
    /* eslint-enable no-console */
  });
});

app.use('/static', express.static('dist/static', { maxage: '31557600h' }));

// generates and returns a site-map, also updates the sitemap in dist/static/sitemap.xml
// possibly recommend robots.txt has link to dist/static/sitemap.xml
// and another process routinely calls this endpoint to refresh sitemap?
app.get('/sitemap.xml', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/xml',
    'Surrogate-Control': 'max-age=3600',
  });
  generateSiteMap(res).catch(() => res.status(500).send('Error Occured'));
});

app.get('/*', (request, response) => {
  const { url } = request;
  // const { path } = request;
  // Clean Up url to remove functional params such as fragment and static

  const isDynamicNormalised = request.query.dynamic
    ? request.query.dynamic.toLowerCase()
    : 'false';

  // Hack for listing pages to avoid SSR
  const onlyDynamic = ['/blog', '/careers/opportunities'].includes(
    request.path
  );

  const isDynamic =
    onlyDynamic || isDynamicNormalised === 'true' ? true : false;

  const isReduxRequestNormalised = request.query.redux
    ? request.query.redux.toLowerCase()
    : 'false';
  const isReduxRequest = isReduxRequestNormalised === 'true' ? true : false;
  const context = {};
  const store = createStore();
  /* eslint-disable no-console */
  console.log('-- here -1');
  let status = 200;

  const versionStatusFromHostname = GetDeliveryApiStatusFromHostname(
    request.hostname
  );

  const modules = [];
  const jsx = (
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <ReduxProvider store={store}>
        <StaticRouter context={context} location={url}>
          <App />
        </StaticRouter>
      </ReduxProvider>
    </Loadable.Capture>
  );

  console.log(
    `Request for ${request.path} HostName:${request.hostname} Version Status: ${versionStatusFromHostname}`
  );
  // Dynamic Doesn't need sagas
  if (isDynamic) {
    renderToString(jsx);
    const isDynamicHint = `<script>window.isDynamic = true;</script>`;
    const dynamicBundles = getBundles(stats, modules);
    const dynamicBundleScripts = dynamicBundles
      .map(bundle => `<script src="${bundle.publicPath}"></script>`)
      .join('');
    const responseHtmlDynamic = templateHTML
      .replace('{{TITLE}}', '')
      .replace('{{SEO_CRITICAL_METADATA}}', '')
      .replace('{{CRITICAL_CSS}}', '')
      .replace('{{APP}}', '')
      .replace('{{LOADABLE_CHUNKS}}', dynamicBundleScripts)
      .replace('{{REDUX_DATA}}', isDynamicHint);
    response.setHeader('Surrogate-Control', 'max-age=3600');
    response.status(status).send(responseHtmlDynamic);
  } else {
    store.dispatch(setVersion(versionInfo.commitRef, versionInfo.buildNo));
    // Set-up the Version Status for API Calls
    store.dispatch(setVersionStatus(versionStatusFromHostname));

    store
      .runSaga(rootSaga)
      .done.then(() => {
        const sheet = new ServerStyleSheet();

        const html = renderToString(sheet.collectStyles(jsx));
        const helmet = Helmet.renderStatic();
        Helmet.rewind();
        let title = helmet.title.toString();
        const metadata = helmet.meta.toString();

        if (context.status === 404) {
          status = 404;
          title = '<title>404 page not found</title>';
        }

        if (context.url) {
          return response.redirect(302, context.url);
        }

        const reduxState = store.getState();
        const styleTags = sheet.getStyleTags();

        const bundles = getBundles(stats, modules);

        const bundleScripts = bundles
          .map(bundle => `<script src="${bundle.publicPath}"></script>`)
          .join('');
        const isFragmentNormalised = request.query.fragment
          ? request.query.fragment.toLowerCase()
          : 'false';
        const isStaticNormalised = request.query.static
          ? request.query.static.toLowerCase()
          : 'false';
        const isFragment = isFragmentNormalised === 'true' ? true : false;
        let isStatic = isStaticNormalised === 'true' ? true : false;
        let serialisedReduxData = '';
        if (context.status !== 404) {
          if (isReduxRequest) {
            serialisedReduxData = serialize(reduxState);
            addStandardHeaders(reduxState, response);
            response.status(status).json(serialisedReduxData);
            return true;
          }
          if (!DISABLE_SSR_REDUX) {
            serialisedReduxData = serialize(reduxState);
            serialisedReduxData = `<script>window.REDUX_DATA = ${serialisedReduxData}</script>`;
          } /* global DISABLE_SSR_REDUX */
        }
        if (context.status === 404) {
          isStatic = true;
        }
        if (isFragment) {
          if (isStatic) {
            addStandardHeaders(reduxState, response);
            response.status(status).send(minifyCssString(styleTags) + html);
          } else {
            const responseHTML = templateHTMLFragment
              .replace('{{TITLE}}', title)
              .replace('{{SEO_CRITICAL_METADATA}}', metadata)
              .replace('{{CRITICAL_CSS}}', minifyCssString(styleTags))
              .replace('{{APP}}', html)
              .replace('{{LOADABLE_CHUNKS}}', bundleScripts)
              .replace('{{REDUX_DATA}}', serialisedReduxData);
            addStandardHeaders(reduxState, response);
            response.status(status).send(responseHTML);
          }
        } else {
          let responseHTML = '';

          if (isStatic) {
            responseHTML = templateHTMLStatic
              .replace('{{TITLE}}', title)
              .replace('{{SEO_CRITICAL_METADATA}}', metadata)
              .replace('{{CRITICAL_CSS}}', minifyCssString(styleTags))
              .replace('{{APP}}', html)
              .replace('{{LOADABLE_CHUNKS}}', '');
          } else {
            responseHTML = templateHTML
              .replace('{{TITLE}}', title)
              .replace('{{SEO_CRITICAL_METADATA}}', metadata)
              .replace('{{CRITICAL_CSS}}', minifyCssString(styleTags))
              .replace('{{APP}}', html)
              .replace('{{LOADABLE_CHUNKS}}', bundleScripts)
              .replace('{{REDUX_DATA}}', serialisedReduxData);
          }
          addStandardHeaders(reduxState, response);
          response.status(status).send(responseHTML);
        }
      })
      .catch(err => {
        // Handle any error that occurred in any of the previous
        // promises in the chain.
        /* eslint-disable no-console */
        console.log(err);
        /* eslint-enable no-console */
        response.status(500).send('Error Occured');
      });
    store.dispatch(initialiseApp());
    store.dispatch(loadNavigationTree());
    renderToString(jsx);
    store.close();
  }
});
app.on('ready', () => {
  Loadable.preloadAll().then(() => {
    var server = app.listen(3001, () => {
      console.info(`HTTP Server is listening @ port 3001`);
      setTimeout(function() {
        app.emit('app_started');
      }, 500);
    });
    app.on('stop', () => {
      server.close(function() {
        console.info('GoodBye :(');
      });
    });
  });
});
