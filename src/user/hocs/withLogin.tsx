import React from 'react';
import { useCookies } from 'react-cookie';
import { connect } from 'react-redux';
import { loginUser, logoutUser } from '../redux/actions';
import {
  selectUser,
  selectUserErrorMessage,
  selectUserIsAuthenticationError,
  selectUserIsError,
  selectUserIsAuthenticated,
  selectUserIsLoading,
} from '../redux/selectors';
import { CookieHelper } from '../util/CookieHelper.class';
import { toJS } from '~/util/ToJs';
import { AppState } from '~/redux/appstate';

const getDisplayName = (WrappedComponent: React.ComponentType) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

const withLogin = (WrappedComponent: React.ComponentType) => {
  const mapStateToProps = (state: AppState) => {
    return {
      errorMessage: selectUserErrorMessage(state),
      isAuthenticated: selectUserIsAuthenticated(state),
      isAuthenticationError: selectUserIsAuthenticationError(state),
      isError: selectUserIsError(state),
      isLoading: selectUserIsLoading(state),
      user: selectUser(state),
      // DEPRECATED: authenticationError is deprecated use isAuthenticationError instead
      authenticationError: selectUserIsAuthenticationError(state),
      // DEPRECATED: error is deprecated use isError instead
      error: selectUserIsError(state),
    };
  };

  const ConnectedComponent = () => {
    const cookies = new CookieHelper(...useCookies());

    const mapDispatchToProps = {
      loginUser: (username: string, password: string) =>
        loginUser(username, password, cookies),
      logoutUser: (redirectPath?: string) => logoutUser(redirectPath, cookies),
    };

    const FinalComponent = connect(
      mapStateToProps,
      mapDispatchToProps
    )(toJS(WrappedComponent));

    return <FinalComponent />;
  };

  ConnectedComponent.displayName = `${getDisplayName(WrappedComponent)}`;
  ConnectedComponent.WrappedComponent = WrappedComponent;

  return ConnectedComponent;
};

export default withLogin;
