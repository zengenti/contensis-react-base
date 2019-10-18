import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import {
  selectRouteEntry,
  selectCurrentProject,
} from '~/core/redux/selectors/routing';
import { toJS } from '~/core/containers/ToJs';

import NotFound from '~/pages/NotFound';
import SearchResults from '~/features/search';

const SearchResultsPage = ({ entry }) => {
  if (!entry) return <NotFound />;
  return <SearchResults entry={entry} />;
};

SearchResultsPage.propTypes = {
  entry: PropTypes.object,
  project: PropTypes.string,
  accessMethod: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    entry: selectRouteEntry(state),
    project: selectCurrentProject(state),
  };
};

export default hot(connect(mapStateToProps)(toJS(SearchResultsPage)));
