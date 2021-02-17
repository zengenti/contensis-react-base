import { Map, List, fromJS } from 'immutable';
import { t as selectUser, u as selectCurrentSearch, e as SET_ROUTE, v as selectUsername } from './selectors-93653e5b.js';
import queryString from 'query-string';
import { takeEvery, call, fork, select, put } from '@redux-saga/core/effects';
import Cookies from 'js-cookie';

const ACTION_PREFIX = '@USER/';
const UPDATE_USER = `${ACTION_PREFIX}UPDATE_USER`;
const LOGIN_USER = `${ACTION_PREFIX}LOGIN_USER`;
const LOGIN_SUCCESSFUL = `${ACTION_PREFIX}LOGIN_SUCCESSFUL`;
const LOGIN_FAILED = `${ACTION_PREFIX}LOGIN_FAILED`;
const LOGOUT_USER = `${ACTION_PREFIX}LOGOUT_USER`;
const TOGGLE_LOGIN_MODE = `${ACTION_PREFIX}TOGGLE_LOGIN_MODE`;
const CREATE_USER_ACCOUNT = `${ACTION_PREFIX}CREATE_USER_ACCOUNT`;
const VALIDATE_USER = `${ACTION_PREFIX}VALIDATE_USER`;
const VALIDATE_USER_SUCCESS = `${ACTION_PREFIX}VALIDATE_USER_SUCCESS`;
const VALIDATE_USER_FAILED = `${ACTION_PREFIX}VALIDATE_USER_FAILED`;
const FORGOT_USER_PASSWORD = `${ACTION_PREFIX}FORGOT_USER_PASSWORD`;
const FORGOT_USER_PASSWORD_COMPLETE = `${ACTION_PREFIX}FORGOT_USER_PASSWORD_COMPLETE`;
const CHANGE_USER_PASSWORD = `${ACTION_PREFIX}CHANGE_USER_PASSWORD`;
const CHANGE_USER_PASSWORD_FAILED = `${ACTION_PREFIX}CHANGE_USER_PASSWORD_FAILED`;
const CHANGE_USER_PASSWORD_COMPLETE = `${ACTION_PREFIX}CHANGE_USER_PASSWORD_COMPLETE`;
const SET_RECAPTCHA_KEY = `${ACTION_PREFIX}SET_RECAPTCHA_KEY`;
const SET_RECAPTCHA_RESPONSE = `${ACTION_PREFIX}SET_RECAPTCHA_RESPONSE`;

var user = /*#__PURE__*/Object.freeze({
  __proto__: null,
  UPDATE_USER: UPDATE_USER,
  LOGIN_USER: LOGIN_USER,
  LOGIN_SUCCESSFUL: LOGIN_SUCCESSFUL,
  LOGIN_FAILED: LOGIN_FAILED,
  LOGOUT_USER: LOGOUT_USER,
  TOGGLE_LOGIN_MODE: TOGGLE_LOGIN_MODE,
  CREATE_USER_ACCOUNT: CREATE_USER_ACCOUNT,
  VALIDATE_USER: VALIDATE_USER,
  VALIDATE_USER_SUCCESS: VALIDATE_USER_SUCCESS,
  VALIDATE_USER_FAILED: VALIDATE_USER_FAILED,
  FORGOT_USER_PASSWORD: FORGOT_USER_PASSWORD,
  FORGOT_USER_PASSWORD_COMPLETE: FORGOT_USER_PASSWORD_COMPLETE,
  CHANGE_USER_PASSWORD: CHANGE_USER_PASSWORD,
  CHANGE_USER_PASSWORD_FAILED: CHANGE_USER_PASSWORD_FAILED,
  CHANGE_USER_PASSWORD_COMPLETE: CHANGE_USER_PASSWORD_COMPLETE,
  SET_RECAPTCHA_KEY: SET_RECAPTCHA_KEY,
  SET_RECAPTCHA_RESPONSE: SET_RECAPTCHA_RESPONSE
});

const initialUserState = Map({
  loggedIn: false,
  failedLogin: null,
  username: null,
  id: null,
  securityToken: null,
  logonResult: null,
  groups: new List([]),
  emailAddress: null,
  fullName: null,
  loginScreenMode: 'login',
  passwordReset: false,
  passwordResetMessage: null,
  changePasswordMessage: null,
  recaptcha: new Map({
    key: null,
    response: new Map({
      isHuman: false,
      token: null
    })
  })
});
var UserReducer = ((state = initialUserState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      {
        const {
          user
        } = action;
        return state.set('loggedIn', typeof user.loggedIn !== 'undefined' ? user.loggedIn : state.get('loggedIn')).set('failedLogin', typeof user.failedLogin !== 'undefined' ? user.failedLogin : state.get('failedLogin')).set('username', user.username || state.get('username')).set('id', user.id || state.get('id')).set('securityToken', user.securityToken || state.get('securityToken')).set('logonResult', user.logonResult || state.get('logonResult')).set('groups', fromJS(user.groups) || state.get('groups')).set('emailAddress', user.emailAddress || state.get('emailAddress')).set('fullName', user.fullName || state.get('fullName')).set('passwordReset', typeof user.passwordReset !== 'undefined' ? user.passwordReset : state.get('passwordReset')).set('passwordResetMessage', user.passwordResetMessage || state.get('passwordResetMessage')).set('changePasswordMessage', user.changePasswordMessage || state.get('changePasswordMessage'));
      }

    case TOGGLE_LOGIN_MODE:
      {
        const newMode = action.loginMode;
        return state.set('loginScreenMode', newMode);
      }

    case SET_RECAPTCHA_KEY:
      {
        return state.setIn(['recaptcha', 'key'], action.key);
      }

    case SET_RECAPTCHA_RESPONSE:
      {
        return state.setIn(['recaptcha', 'response', 'isHuman'], action.isHuman).setIn(['recaptcha', 'response', 'token'], action.token);
      }

    default:
      return state;
  }
});

const COOKIE_VALID_DAYS = 1; // 0 = Session cookie
// Override the default js-cookie conversion / encoding
// methods so the written values work with Contensis sites

const _cookie = Cookies.withConverter({
  read: value => decodeURIComponent(value),
  write: value => encodeURIComponent(value)
});

class CookieHelper {
  static GetCookie(name) {
    return _cookie.get(name);
  }

  static SetCookie(name, value, maxAgeDays = COOKIE_VALID_DAYS) {
    maxAgeDays === 0 ? _cookie.set(name, value) : _cookie.set(name, value, {
      expires: maxAgeDays
    });
  }

  static DeleteCookie(name) {
    _cookie.remove(name);
  }

}

const CMS_URL = SERVERS.cms;
/* global SERVERS */

const config = {
  REGISTER_USER_URI: 'Security/RegisterUser',
  LOGON_USER_URI: 'REST/Contensis/Security/AuthenticateApplication',
  VALIDATE_USER_URI: 'REST/Contensis/Security/IsAuthenticated',
  USER_INFO_URI: 'REST/Contensis/Security/GetUserInfo',
  FORGOT_PASSWORD_URI: 'Security/ResetPasswordEmail',
  CHANGE_PASSWORD_URI: 'Security/ChangePassword',
  CHANGE_PASSWORD_TOKEN_URI: 'Security/ChangePasswordWithToken',
  AUTH_CAPTCHA_URI: 'Security/AuthenticateCaptcha',
  LOGIN_URL: '/business-government/partner'
};
const REGISTER_USER_URL = `${CMS_URL}/${config.REGISTER_USER_URI}`;
const LOGON_USER_URL = `${CMS_URL}/${config.LOGON_USER_URI}`;
const VALIDATE_USER_URL = `${CMS_URL}/${config.VALIDATE_USER_URI}`;
const USER_INFO_URL = `${CMS_URL}/${config.USER_INFO_URI}`;
const FORGOT_PASSWORD_URI = `/${config.FORGOT_PASSWORD_URI}`;
const CHANGE_PASSWORD_URI = `/${config.CHANGE_PASSWORD_URI}`;
const AUTH_CAPTCHA_URI = `/${config.AUTH_CAPTCHA_URI}`;
const CHANGE_PASSWORD_TOKEN_URI = `/${config.CHANGE_PASSWORD_TOKEN_URI}`;
const BASE_OPTIONS = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};
class SecurityApi {
  static async AuthoriseRecaptcha(token) {
    const url = `${AUTH_CAPTCHA_URI}?captchaToken=${encodeURIComponent(token)}`;
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    };
    return await SecurityApi.get(url, options);
  }

  static async LogonUser(username, password) {
    const body = {
      username,
      password,
      ip: '127.0.0.1',
      applicationName: 'DesktopTool'
    };
    const options = { ...BASE_OPTIONS,
      method: 'POST',
      body: JSON.stringify(body)
    };
    return await SecurityApi.get(LOGON_USER_URL, options);
  }

  static async ValidateUser(securityToken) {
    const url = `${VALIDATE_USER_URL}?token=${encodeURIComponent(securityToken)}`;
    const bodyToken = encodeURIComponent(decodeURIComponent(decodeURIComponent(securityToken)));
    const options = { ...BASE_OPTIONS,
      method: 'POST',
      body: JSON.stringify({
        securityToken: bodyToken
      })
    };
    return await SecurityApi.get(url, options);
  }

  static async GetUserInfo(securityToken) {
    const options = { ...BASE_OPTIONS,
      headers: {
        ['Content-Type']: 'text/plain',
        ContensisCMSUserName: securityToken
      }
    };
    return await SecurityApi.get(USER_INFO_URL, options);
  }

  static async RegisterUser(email, password) {
    const body = {
      email,
      password
    };
    const options = { ...BASE_OPTIONS,
      method: 'POST',
      body: JSON.stringify(body)
    };
    return await SecurityApi.get(REGISTER_USER_URL, options);
  }

  static async ChangePassword(username, oldPassword, newPassword, newPasswordConfirm) {
    const url = `${CHANGE_PASSWORD_URI}?username=${encodeURIComponent(username)}&oldPassword=${encodeURIComponent(oldPassword)}&newPassword=${encodeURIComponent(newPassword)}&newPasswordConfirm=${encodeURIComponent(newPasswordConfirm)}`;
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    };
    return await SecurityApi.get(url, options);
  }

  static async ChangePasswordWithToken(token, newPassword, newPasswordConfirm) {
    const url = `${CHANGE_PASSWORD_TOKEN_URI}?token=${token}&newPassword=${encodeURIComponent(newPassword)}&confirmPassword=${encodeURIComponent(newPasswordConfirm)}`;
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    };
    return await SecurityApi.get(url, options);
  }

  static async ForgotPassword(username, currentUrl) {
    const url = `${FORGOT_PASSWORD_URI}?username=${encodeURIComponent(username)}&currentUrl=${encodeURIComponent(currentUrl)}`;
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    };
    return await SecurityApi.get(url, options);
  }

  static async get(url, options = BASE_OPTIONS) {
    try {
      const responseBody = await api(url, options);
      if (responseBody) return responseBody;
      return false;
    } catch (error) {
      return false;
    }
  }

}

async function api(url, options) {
  return fetch(url, options).then(async response => {
    setTimeout(() => null, 0);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json().then(data => data);
  }).catch(error => {
    //console.log(error);
    throw error;
  });
}

// import { ajax } from 'jquery';
// import userManager from './oidc/userManager';

const LOGIN_COOKIE = 'ContensisCMSUserName';
const LAST_USERNAME_COOKIE = 'ContensisLastUserName';
const DISPLAY_NAME_COOKIE = 'ContensisDisplayName';
const USER_LANGUAGE_COOKIE = 'User_LanguageID';
const AVATAR_COOKIE = 'ContensisAvatar'; // const contensis = CONTENSIS; /* global CONTENSIS */

class LoginHelper {
  static GetLoginCookie() {
    return CookieHelper.GetCookie(LOGIN_COOKIE);
  }

  static SetLoginCookies(user) {
    if (user.securityToken) CookieHelper.SetCookie(LOGIN_COOKIE, user.securityToken);

    if (user.username) {
      CookieHelper.SetCookie(LAST_USERNAME_COOKIE, user.username);
      CookieHelper.SetCookie(DISPLAY_NAME_COOKIE, user.username);
    }
  }

  static GetCachedCredentials() {
    return {
      securityToken: CookieHelper.GetCookie(LOGIN_COOKIE),
      username: CookieHelper.GetCookie(LAST_USERNAME_COOKIE),
      displayName: CookieHelper.GetCookie(DISPLAY_NAME_COOKIE),
      languageId: CookieHelper.GetCookie(USER_LANGUAGE_COOKIE),
      avatar: CookieHelper.GetCookie(AVATAR_COOKIE)
    };
  }

  static GetCachedCredentialsSSR(cookies) {
    return {
      securityToken: cookies[LOGIN_COOKIE],
      username: cookies[LAST_USERNAME_COOKIE],
      displayName: cookies[DISPLAY_NAME_COOKIE],
      languageId: cookies[USER_LANGUAGE_COOKIE],
      avatar: cookies[AVATAR_COOKIE]
    };
  }

  static ClearCachedCredentials() {
    CookieHelper.DeleteCookie(LOGIN_COOKIE);
    CookieHelper.DeleteCookie(LAST_USERNAME_COOKIE);
    CookieHelper.DeleteCookie(DISPLAY_NAME_COOKIE);
    CookieHelper.DeleteCookie(USER_LANGUAGE_COOKIE);
    CookieHelper.DeleteCookie(AVATAR_COOKIE);
  }

  static async ValidateUser(groups = false, cookies = null) {
    const cached = cookies ? this.GetCachedCredentialsSSR(cookies) : this.GetCachedCredentials();

    if (cached.securityToken) {
      const response = await SecurityApi.ValidateUser(cached.securityToken);
      if (!response) return false; // Convert result to a User object

      const user = {
        username: cached.username,
        securityToken: encodeURIComponent(response.SecurityToken),
        logonResult: response.LogonResult,
        id: response.UserID,
        loginScreenMode: 'login'
      };

      if (user.logonResult !== 0) {
        // Clear the cookie cache so we don't need to validate again
        LoginHelper.ClearCachedCredentials();
      } else {
        // Set logged in flag
        user.loggedIn = true;

        if (groups) {
          const userWithGroups = await this.GetGroups(user);
          return userWithGroups;
        }
      }

      return user;
    }

    return false;
  }

  static async LoginUser(username, password, groups = false) {
    if (username && password) {
      // Call LogonUser API
      const loginResponse = await SecurityApi.LogonUser(username, password);

      if (loginResponse) {
        // Extract the elements we need from the response
        const {
          SecurityToken,
          LogonResult,
          UserID
        } = loginResponse;
        const failedLogin = !!LogonResult; // 0 is successful
        // Map response to new user object

        const user = {
          username,
          failedLogin,
          loggedIn: !!SecurityToken && !failedLogin,
          securityToken: SecurityToken,
          id: UserID,
          logonResult: this.CheckResult(LogonResult)
        };

        if (!user.failedLogin && !!user.securityToken) {
          this.SetLoginCookies(user);

          if (groups) {
            const userWithGroups = await this.GetGroups(user);
            return userWithGroups;
          }
        }

        return user;
      } else {
        // Create user object to show login failed due to service fault
        return {
          securityToken: null,
          loggedIn: false,
          failedLogin: true,
          logonResult: 'Service Fault'
        };
      }
    }
  }

  static async GetGroups(user) {
    if (!user.securityToken) {
      return user;
    }

    const userInfoResponse = await SecurityApi.GetUserInfo(user.securityToken);

    if (userInfoResponse) {
      const response = JSON.parse(userInfoResponse);

      if (response.Error || !response.GroupCollection) {
        user.errorMessage = `Problem fetching user info: ${response.Error}`;
      } else {
        user.groups = response.GroupCollection.map(group => ({
          name: group.GroupName,
          id: group.GroupId
        }));
        user.fullName = response.Fullname;
        user.emailAddress = response.Email;
      }
    }

    return user;
  }

  static LogoutUser() {
    this.ClearCachedCredentials();
    return initialUserState.toJS();
  }

  static ClientRedirectToLogin(uri) {
    if (typeof window != 'undefined') {
      window.location.href = LoginHelper.LoginPageUrl(uri); // LoginHelper.IsWsFedSignin()
      // ? LoginHelper.WsFedLoginPageUrl(window.location)
      // : LoginHelper.LoginPageUrl(uri);
    }
  }

  static LoginPageUrl(uri) {
    return `${uri || '/login'}?redirect_uri=${window.location.pathname + window.location.search}`;
  } // static WsFedLoginPageUrl(currentLocation) {
  //   const loginPage = contensis.ADFS_LOGIN_PAGE.replace(
  //     '{redirect_uri}',
  //     encodeURIComponent(currentLocation.toString().split('#')[0])
  //   ).replace('{nonce}', randomString(5));
  //   return `${contensis.URL}${loginPage}`.replace(/([^:]\/)\/+/g, '$1');
  // }
  // static IsWsFedSignin() {
  //   return contensis.WSFED_SIGNIN;
  // }
  // static WsFedSignin(redirectUri) {
  //   userManager.signinRedirect({
  //     scope: 'openid',
  //     response_type: 'id_token',
  //     redirect_uri: redirectUri || window.location.toString(),
  //   });
  // }
  // static WsFedLogout() {
  //   ajax(`${contensis.URL}authenticate/logout/`, {
  //     dataType: 'jsonp',
  //     jsonp: false,
  //     async: false,
  //   });
  // }


  static async ForgotPassword(username) {
    if (username) {
      const currentUrl = window.location.protocol + '//' + window.location.host;
      const passwordResponse = await SecurityApi.ForgotPassword(username, currentUrl);

      if (passwordResponse) {
        // Extract the elements we need from the response
        return passwordResponse;
      }
    }
  }

  static async ChangePassword(username, oldPassword, newPassword, newPasswordConfirm) {
    if (newPassword && newPasswordConfirm) {
      if (this.ValidatePassword(newPassword)) {
        const passwordResponse = await SecurityApi.ChangePassword(username, oldPassword, newPassword, newPasswordConfirm); //const passwordResponse = await SecurityApi.ChangePassword(btoa(username), btoa(oldPassword), btoa(newPassword), btoa(newPasswordConfirm));

        if (passwordResponse) {
          // Extract the elements we need from the response
          return passwordResponse;
        }
      } else {
        return 'New password does not meet the requirements: \r\n\r\n - Must be a minimum of 8 characters long \r\n - Must contain at least 1 uppercase character \r\n - Must contain at least 1 special character or number';
      }
    }
  }

  static async ChangePasswordWithToken(token, newPassword, newPasswordConfirm) {
    if (newPassword && newPasswordConfirm) {
      if (this.ValidatePassword(newPassword)) {
        const passwordResponse = await SecurityApi.ChangePasswordWithToken(token, btoa(newPassword), btoa(newPasswordConfirm)); //const passwordResponse = await SecurityApi.ChangePassword(btoa(username), btoa(oldPassword), btoa(newPassword), btoa(newPasswordConfirm));

        if (passwordResponse) {
          // Extract the elements we need from the response
          return passwordResponse;
        }
      } else {
        return 'New password does not meet the requirements: \r\n\r\n - Must be a minimum of 8 characters long \r\n - Must contain at least 1 uppercase character \r\n - Must contain at least 1 special character or number';
      }
    }
  }

  static ValidatePassword(pword) {
    //Password must be over 8 characters long
    if (pword.length < 8) return false; //This only returns true if the following criteria is met:
    //  *8 chars or more
    //  *Must contain at least 1 capital letter
    //  *Must contain at least 1 number or special character

    return /^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{8,}$/.test(pword);
  }

  static CheckResult(result) {
    const Results = {
      '0': 'OK',
      '-2': 'Incorrect username or password',
      '-3': 'Account disabled',
      '-4': 'Account locked',
      '-5': 'Log on from this PC is denied',
      '-6': 'Log on at this time is denied',
      '-7': 'Account already logged in',
      '-9': 'Unspecified error',
      '2': 'Password change required',
      '3': 'Insufficient privileges',
      '-10': 'Account expired',
      '-11': 'Maintenance mode',
      '4': 'Security token expired',
      '': 'An error has occured'
    };
    return Results[result];
  }

}

const userSagas = [takeEvery(LOGIN_USER, loginUserSaga), takeEvery(LOGOUT_USER, logoutUserSaga), takeEvery(VALIDATE_USER, validateUserSaga), takeEvery(CREATE_USER_ACCOUNT, createUserAccountSaga), takeEvery(FORGOT_USER_PASSWORD, forgotPassword), takeEvery(CHANGE_USER_PASSWORD, changePassword)];

function* loginUserSaga(action) {
  const getGroups = true;
  const {
    username,
    password
  } = action;

  if (username && password) {
    const user = yield LoginHelper.LoginUser(username, password, getGroups);
    yield call(updateUserSaga, {
      type: user.failedLogin ? LOGIN_FAILED : LOGIN_SUCCESSFUL,
      user,
      redirect: !user.failedLogin
    });
  } else {
    yield LoginHelper.ClientRedirectToLogin();
  }
}

function* logoutUserSaga() {
  const user = LoginHelper.LogoutUser();
  yield fork(updateUserSaga, {
    user
  });
  const state = yield select();
  yield LoginHelper.ClientRedirectToHome(state.getIn(['router', 'location']));
}

function* validateUserSaga(action) {
  const getGroups = true;
  const state = yield select();
  const currentQs = queryString.parse(state.getIn(['router', 'location', 'search']));
  const qsToken = currentQs.securityToken || currentQs.securitytoken;

  if (qsToken) {
    LoginHelper.SetLoginCookies({
      securityToken: qsToken
    });
  }

  const cookies = !qsToken ? action.cookies : {
    ContensisCMSUserName: encodeURIComponent(qsToken),
    ...action.cookies
  };
  const user = yield LoginHelper.ValidateUser(getGroups, cookies);
  const type = user && user.loggedIn ? VALIDATE_USER_SUCCESS : VALIDATE_USER_FAILED;
  yield call(updateUserSaga, {
    type,
    user: user && !user.loggedIn ? initialUserState : user
  });
}

function* updateUserSaga(action) {
  const userState = yield select(selectUser);
  yield put({
    type: UPDATE_USER,
    from: action.type,
    user: { ...userState.toJS(),
      ...action.user
    }
  });

  if (action.redirect) {
    const currentSearch = yield select(selectCurrentSearch);
    const qs = queryString.parse(currentSearch);
    const redirectUri = qs.redirect_uri;

    if (redirectUri) {
      yield put({
        type: SET_ROUTE,
        path: redirectUri
      });
    }
  }
}

function* forgotPassword(action) {
  const message = yield LoginHelper.ForgotPassword(action.username);
  yield put({
    type: UPDATE_USER,
    user: {
      passwordReset: true,
      passwordResetMessage: message
    },
    history
  });
}

function* changePassword(action) {
  const state = yield select();
  const username = selectUsername(state);
  let message = '';

  if (action.token) {
    message = yield LoginHelper.ChangePasswordWithToken(action.token, action.newPassword, action.newPasswordConfirm);
  } else {
    message = yield LoginHelper.ChangePassword(username, action.oldPassword, action.newPassword, action.newPasswordConfirm);
  }

  yield put({
    type: UPDATE_USER,
    user: {
      logonResult: message
    },
    history
  });
}

function* createUserAccountSaga() {
  const userState = yield select(selectUser);

  if (userState.username && userState.password) {
    // Call RegisterUser API
    const registerResponse = yield SecurityApi.RegisterUser(userState.username, userState.password);

    if (registerResponse) {
      const {
        securityToken,
        registrationResult,
        id
      } = registerResponse;

      if (securityToken) {
        const user = { ...userState,
          id,
          securityToken,
          password: null,
          loggedIn: true,
          verifiedEmail: false,
          failedLogin: false,
          failedToCreateAccount: false,
          registrationResult
        };
        yield put({
          type: UPDATE_USER,
          user
        });
      } else {
        const user = { ...userState,
          securityToken: null,
          loggedIn: false,
          verifiedEmail: false,
          failedLogin: true,
          failedToCreateAccount: true,
          registrationResult
        };
        yield put({
          type: UPDATE_USER,
          user
        });
      }
    } else {
      yield put({
        type: UPDATE_USER,
        user: { ...userState,
          registrationResult: 'ServiceFault'
        }
      });
    }
  }
}

export { CREATE_USER_ACCOUNT as C, FORGOT_USER_PASSWORD as F, LOGIN_USER as L, SET_RECAPTCHA_KEY as S, TOGGLE_LOGIN_MODE as T, UserReducer as U, VALIDATE_USER as V, user as a, LOGOUT_USER as b, CHANGE_USER_PASSWORD as c, SET_RECAPTCHA_RESPONSE as d, LoginHelper as e, userSagas as u, validateUserSaga as v };
//# sourceMappingURL=sagas-54a94258.js.map
