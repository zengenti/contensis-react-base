import evilDns from 'evil-dns';
import fetchMyIp from '../util/fetchMyIp';
const apiConfig = DELIVERY_API_CONFIG; /* global DELIVERY_API_CONFIG */
const servers = SERVERS; /* global SERVERS */
/* eslint-disable no-console */
console.log();
console.log(
  `Starting with the following servers configured:
`,
  servers
);
console.log();
/* eslint-enable no-console */

const localDns = () => {
  const disableDnsChanges = false;

  const configureLocalEndpoint = () => {
    if (!disableDnsChanges) {
      Object.entries(servers).forEach(([, env]) => {
        evilDns.add(`*${env.alias}.cloud.contensis.com`, env.internalVip);
      });

      Object.entries(apiConfig).forEach(([, env]) => {
        if (env.internalIp) evilDns.add(env.rootUrl, env.internalIp);
      });
    }
  };

  // Break api.ipify to test
  // evilDns.add('api.ipify.org', '8.8.8.8');
  fetchMyIp(servers, configureLocalEndpoint);
};

export default localDns;
