import evilDns from 'evil-dns';
import fetchMyIp from '../util/fetchMyIp';

const servers = SERVERS; /* global SERVERS */
const apiConfig = DELIVERY_API_CONFIG; /* global DELIVERY_API_CONFIG */

const localDns = () => {
  const disableDnsChanges = false;

  const configureLocalEndpoint = () => {
    if (!disableDnsChanges) {
      evilDns.add(`*${servers.alias}.cloud.contensis.com`, servers.internalVip);

      if (apiConfig.internalIp)
        evilDns.add(apiConfig.rootUrl, apiConfig.internalIp);
    }
  };

  // Break api.ipify to test
  // evilDns.add('api.ipify.org', '8.8.8.8');
  fetchMyIp(servers, configureLocalEndpoint);
};

export default localDns;
