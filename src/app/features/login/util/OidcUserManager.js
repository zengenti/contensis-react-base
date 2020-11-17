const context = typeof window != 'undefined' ? window : global;
const requireOidc =
  process.env.NODE_ENV === 'development'
    ? WSFED_LOGIN === 'true' /* global WSFED_LOGIN */
    : context.WSFED_LOGIN === 'true';

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
  if (typeof window !== 'undefined' && requireOidc) {
    try {
      const UserManager = require('oidc-client').UserManager;
      return new UserManager(config);
    } catch (e) {
      //
    }
  } else return {};
};

const userManager = createUserManager(userManagerConfig);

export default userManager;
