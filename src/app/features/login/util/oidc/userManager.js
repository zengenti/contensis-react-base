import createUserManager from './createUserManager';

const contensis = CONTENSIS; /* global CONTENSIS */

var userManagerConfig =
  typeof window !== 'undefined'
    ? {
        authority: `${contensis.URL}/authenticate/`,
        client_id: 'WebsiteAdfsClient',
        redirect_uri: window.location.toString(),
        post_logout_redirect_uri: window.location.toString(),
        response_type: 'id_token',
        scope: 'openid',
        filterProtocolClaims: false,
      }
    : {};

const userManager = createUserManager(userManagerConfig);

export default userManager;
