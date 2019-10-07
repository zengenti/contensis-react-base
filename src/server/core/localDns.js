import evilDns from 'evil-dns';
import fetchMyIp from '../util/fetchMyIp';
const apiConfig = DELIVERY_API_CONFIG; /* global DELIVERY_API_CONFIG */
const env = SERVERS; /* global SERVERS */
/* eslint-disable no-console */
console.log();
console.log(
  `Configured servers:
`,
  env
);
console.log();
/* eslint-enable no-console */

const localDns = () => {
  const disableDnsChanges = false;

  const configureLocalEndpoint = () => {
    if (!disableDnsChanges) {
      evilDns.add(`*${env.alias}.cloud.contensis.com`, env.internalVip);

      if (apiConfig.internalIp)
        evilDns.add(apiConfig.rootUrl, apiConfig.internalIp);
    }
  };

  // Break api.ipify to test
  // evilDns.add('api.ipify.org', '8.8.8.8');
  fetchMyIp(env, configureLocalEndpoint);
};

export default localDns;
