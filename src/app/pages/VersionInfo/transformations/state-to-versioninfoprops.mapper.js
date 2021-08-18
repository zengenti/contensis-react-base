import { default as mapJson } from '~/util/json-mapper';
import { selectCurrentProject } from '~/routing/redux/selectors';
import {
  selectBuildNumber,
  selectCommitRef,
  selectVersionStatus,
} from '~/redux/selectors/version';

const context = typeof window != 'undefined' ? window : global;

const isDev = process.env.NODE_ENV === 'development';

const pj = () =>
  isDev
    ? PACKAGE_JSON /* global PACKAGE_JSON */
    : context.PACKAGE_JSON || { name: 'packagejson not found', repository: '' };

const versionInfoProps = {
  packageDetail: () => {
    const pkg = pj();
    return { name: pkg.name, version: pkg.version, repository: pkg.repository };
  },
  uris: {
    gitRepo: () => pj().repository,
    commit: state => {
      const commitRef = selectCommitRef(state);
      return `${pj().repository}/commit/${commitRef ? commitRef : ''}`;
    },
    pipeline: state => {
      const buildNumber = selectBuildNumber(state);
      return `${pj().repository}/${
        pj().repository.includes('github.com') ? 'actions/runs' : 'pipelines'
      }/${buildNumber ? buildNumber : ''}`;
    },
  },
  zenPackageVersions: () => [
    ...(Object.entries(pj().devDependencies || {}).filter(
      ([pkg]) => pkg.includes('zengenti') || pkg.includes('contensis')
    ) || []),
    ...(Object.entries(pj().dependencies || {}).filter(
      ([pkg]) => pkg.includes('zengenti') || pkg.includes('contensis')
    ) || []),
  ],
  deliveryApi: () =>
    JSON.parse(
      JSON.stringify(DELIVERY_API_CONFIG /* global DELIVERY_API_CONFIG */)
    ),
  devEnv: () =>
    typeof DEV_ENV !== 'undefined' /* global DEV_ENV */ ? DEV_ENV : null,
  disableSsrRedux: () =>
    isDev
      ? DISABLE_SSR_REDUX /* global DISABLE_SSR_REDUX*/
      : context.DISABLE_SSR_REDUX || false,
  nodeEnv: () => process.env.NODE_ENV || 'production',
  packagejson: () => pj() || {},
  projects: () => (isDev ? PROJECTS /* global PROJECTS */ : context.PROJECTS),
  proxyDeliveryApi: () =>
    isDev
      ? PROXY_DELIVERY_API /* global PROXY_DELIVERY_API */
      : context.PROXY_DELIVERY_API || false,
  publicUri: () =>
    isDev ? PUBLIC_URI /* global PUBLIC_URI */ : context.PUBLIC_URI || null,
  project: state => selectCurrentProject(state),
  reverseProxyPaths: () =>
    isDev
      ? REVERSE_PROXY_PATHS /* global REVERSE_PROXY_PATHS */
      : context.REVERSE_PROXY_PATHS || {},
  servers: () => (isDev ? SERVERS /* global SERVERS */ : context.SERVERS),
  version: {
    buildNumber: state => selectBuildNumber(state),
    commitRef: state => selectCommitRef(state),
    contensisVersionStatus: state => selectVersionStatus(state),
  },
};

const mapStateToVersionInfo = state => {
  const mappedProps = mapJson(state, versionInfoProps);
  return mappedProps;
};

export default mapStateToVersionInfo;
