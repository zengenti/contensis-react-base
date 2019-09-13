import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { withRouter, Redirect } from 'react-router-dom';
import { renderRoutes, matchRoutes } from 'react-router-config';

import {
  selectRouteEntry,
  selectRouteEntryContentTypeId,
  selectRouteEntryListingType,
  selectIsNotFound,
} from '~/core/redux/selectors/routing';
import { setRouteEntry, setNavigationPath } from '~/core/redux/actions/routing';
import { loadNavigationTree } from '~/core/redux/actions/navigation';
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
    setRecordEntry: PropTypes.func,
    setNavigationPath: PropTypes.func,
    contentTypeId: PropTypes.string,
    listingType: PropTypes.string,
    tree: PropTypes.object,
    loadNavigationTree: PropTypes.func,
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
      const matchedComponent = ContentTypeMappings.find(
        item => item.contentTypeID == this.props.contentTypeId
      );

      if (matchedComponent) {
        // if (this.props.contentTypeId === 'listing') {
        //   return (
        //     <matchedComponent.component
        //       singleFacetMode
        //       defaultFacet={
        //         this.props.listingType && this.props.listingType.toLowerCase()
        //       }
        //     />
        //   );
        // }
        return <matchedComponent.component />;
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
    listingType: selectRouteEntryListingType(state),
    isNotFound: selectIsNotFound(state),
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setRecordEntry: id => dispatch(setRouteEntry(id)),
    setNavigationPath: path => dispatch(setNavigationPath(path)),
    loadNavigationTree: () => dispatch(loadNavigationTree()),
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
