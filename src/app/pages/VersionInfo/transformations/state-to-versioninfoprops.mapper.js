import { default as mapJson } from '~/core/util/json-mapper';
import { selectCurrentProject } from '~/core/redux/selectors/routing';
import {
  selectBuildNumber,
  selectCommitRef,
  selectVersionStatus,
} from '~/core/redux/selectors/version';

const context = typeof window != 'undefined' ? window : global;

const isDev = process.env.NODE_ENV === 'development';

const packagejson = () =>
  isDev
    ? PACKAGE_JSON /* global PACKAGE_JSON */
    : context.PACKAGE_JSON || { name: 'packagejson not found' };

const versionInfoProps = {
  contensisPackageVersions: () => [
    ...(Object.entries(packagejson().devDependencies || {}).filter(
      ([pkg]) => pkg.includes('zengenti') || pkg.includes('contensis')
    ) || []),
    ...(Object.entries(packagejson().dependencies || {}).filter(
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
  packagejson: () => packagejson() || {},
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
