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
  selectCurrentProject,
} from '~/core/redux/selectors/routing';
import { setNavigationPath } from '~/core/redux/actions/routing';
import NotFound from '~/pages/NotFound';

import { Status } from './Status';
import { toJS } from '../util/ToJs';

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
    routes: PropTypes.objectOf(PropTypes.array, PropTypes.array),
    currentPath: PropTypes.string,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    entry: PropTypes.object,
    projectId: PropTypes.string,
    isNotFound: PropTypes.bool,
    setNavigationPath: PropTypes.func,
    contentTypeId: PropTypes.string,
    withEvents: PropTypes.object,
  };

  static defaultProps = {};

  componentWillMount() {
    const trimmedPath = getTrimmedPath(this.props.location.pathname);
    this.props.setNavigationPath(
      trimmedPath,
      this.props.withEvents,
      this.MatchedStaticRoute(trimmedPath)
    );
  }
  componentWillReceiveProps(nextProps) {
    const nextPath = nextProps.location.pathname;
    const trimmedNextPath = getTrimmedPath(nextPath);
    const trimmedPreviousPath = getTrimmedPath(this.props.location.pathname);
    if (trimmedPreviousPath !== trimmedNextPath) {
      this.props.setNavigationPath(
        trimmedNextPath,
        this.props.withEvents,
        this.MatchedStaticRoute(trimmedNextPath)
      );
    }
  }

  MatchedStaticRoute = pathname =>
    matchRoutes(
      this.props.routes.StaticRoutes,
      typeof window != 'undefined' ? window.location.pathname : pathname
    ).length;

  render = () => {
    const currentPath = this.props.location.pathname;
    const trimmedCurrentPath = getTrimmedPath(this.props.location.pathname);

    const { projectId, contentTypeId, entry } = this.props;

    // Match Any Static Routes a developer has defined
    if (this.MatchedStaticRoute(currentPath)) {
      return renderRoutes(this.props.routes.StaticRoutes, {
        projectId,
        contentTypeId,
        entry,
      });
    }

    // Need to redirect when url endswith a /
    if (currentPath.length > trimmedCurrentPath.length) {
      return <Redirect to={trimmedCurrentPath} />;
    }
    // Match Any Defined Content Type Mappings
    if (contentTypeId) {
      const MatchedComponent = this.props.routes.ContentTypeMappings.find(
        item => item.contentTypeID == contentTypeId
      );

      if (MatchedComponent) {
        return (
          <MatchedComponent.component
            projectId={projectId}
            contentTypeId={contentTypeId}
            entry={entry}
          />
        );
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
    projectId: selectCurrentProject(state),
    contentTypeId: selectRouteEntryContentTypeId(state),
    entry: selectRouteEntry(state),
    isNotFound: selectIsNotFound(state),
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setNavigationPath: (path, withEvents, isStatic) =>
      dispatch(setNavigationPath(path, withEvents, isStatic)),
  };
}

export default hot(module)(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(toJS(RouteLoader))
  )
);
