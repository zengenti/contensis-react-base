const servers = SERVERS; /* global SERVERS */

const userManagerConfig =
  typeof window !== 'undefined'
    ? {
        authority: `${servers.cms}/authenticate/`,
        client_id: 'WebsiteAdfsClient',
        redirect_uri: window.location.toString(),
        post_logout_redirect_uri: window.location.toString(),
        response_type: 'id_token',
        scope: 'openid',
        filterProtocolClaims: false,
      }
    : {};

const createUserManager = config => {
  if (typeof window !== 'undefined') {
    const UserManager = require('oidc-client').UserManager;
    return new UserManager(config);
  } else return {};
};

const userManager = createUserManager(userManagerConfig);

export default userManager;
