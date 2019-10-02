import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { withRouter, Redirect } from 'react-router-dom';
import { renderRoutes, matchRoutes } from 'react-router-config';

import {
  selectRouteEntry,
  selectRouteEntryContentTypeId,
  selectIsNotFound,
} from '~/core/redux/selectors/routing';
import { setNavigationPath } from '~/core/redux/actions/routing';
import NotFound from '~/pages/NotFound';
import ContentTypeMappings from './ContentTypeMappings';
import staticRoutes from './StaticRoutes';
import { Status } from './Status';

const getTrimmedPath = path => {
  if (path !== '/') {
    const lastChar = path[path.length - 1];
    if (lastChar == '/') {
      return path.substring(0, path.length - 1);
    }
  }
  return path;
};

class RouteLoader extends Component {
  static propTypes = {
    currentPath: PropTypes.string,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    entry: PropTypes.object,
    isNotFound: PropTypes.bool,
    setNavigationPath: PropTypes.func,
    contentTypeId: PropTypes.string,
  };
  static defaultProps = {};

  componentWillMount() {
    const trimmedPath = getTrimmedPath(this.props.location.pathname);
    this.props.setNavigationPath(trimmedPath);
  }
  componentWillReceiveProps(nextProps) {
    const nextPath = nextProps.location.pathname;
    const trimmedNextPath = getTrimmedPath(nextPath);
    const trimmedPreviousPath = getTrimmedPath(this.props.location.pathname);
    if (trimmedPreviousPath !== trimmedNextPath) {
      this.props.setNavigationPath(trimmedNextPath);
    }
  }

  render = () => {
    // Match Any Static Routes a developer has defined
    const MatchedStaticRoute = matchRoutes(
      staticRoutes,
      this.props.location.pathname
    );

    if (MatchedStaticRoute.length > 0) {
      // debugger;
      return renderRoutes(staticRoutes);
    }

    // Need to redirect when url endswith a /
    const currentPath = this.props.location.pathname;
    const trimmedCurrentPath = getTrimmedPath(this.props.location.pathname);
    if (currentPath.length > trimmedCurrentPath.length) {
      return <Redirect to={trimmedCurrentPath} />;
    }
    // Match Any Defined Content Type Mappings
    if (this.props.contentTypeId) {
      const MatchedComponent = ContentTypeMappings.find(
        item => item.contentTypeID == this.props.contentTypeId
      );

      if (MatchedComponent) {
        return <MatchedComponent.component />;
      }
    }

    if (this.props.isNotFound) {
      return (
        <Status code={404}>
          <NotFound />
        </Status>
      );
    }
    return null;
  };
}

const mapStateToProps = state => {
  return {
    entry: selectRouteEntry(state),
    contentTypeId: selectRouteEntryContentTypeId(state),
    isNotFound: selectIsNotFound(state),
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setNavigationPath: path => dispatch(setNavigationPath(path)),
  };
}

export default hot(module)(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(RouteLoader)
  )
);
