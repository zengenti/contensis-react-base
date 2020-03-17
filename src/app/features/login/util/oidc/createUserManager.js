export default function createUserManager(config) {
  if (typeof window !== 'undefined') {
    const UserManager = require('oidc-client').UserManager;
    return new UserManager(config);
  } else return {};
}
