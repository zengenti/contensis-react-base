// Classes
export { LoginHelper } from './util/LoginHelper.class';

// Containers
export { default as LoginContainer } from './containers/Login.container';
export { default as RegistrationContainer } from './containers/Registration.container';
export { default as ForgotPasswordContainer } from './containers/ForgotPassword.container';
export { default as ChangePassword } from './containers/ChangePassword.container';

// HOCs
export { default as withLogin } from './hocs/withLogin';
export { default as withRegistration } from './hocs/withRegistration';

// Hooks
export { default as useLogin } from './hooks/useLogin';
export { default as useRegistration } from './hooks/useRegistration';
export { default as useForgotPassword } from './hooks/useForgotPassword';
export { default as useChangePassword } from './hooks/useChangePassword';

// Site login setting — read this instead of the `USE_IDP` global, so the server
// and the client return the same answer.
export {
  activeLoginMethod,
  isIdpEnabled,
  isWsFedLoginEnabled,
} from './idp/setting';

// Redux
export {
  handleRequiresLoginSaga,
  refreshSecurityToken,
} from './redux/sagas/login';
export * as actions from './redux/actions';
export { default as reducer, initialUserState } from './redux/reducers';
export * as selectors from './redux/selectors';
export * as types from './redux/types';
