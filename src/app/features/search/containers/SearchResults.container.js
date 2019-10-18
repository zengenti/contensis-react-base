import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toJS } from '~/core/containers/ToJs/ToJs';
import {
  initListing,
  updateCurrentFacet,
  updateSelectedFilters,
  updateSearchTerm,
} from '../redux/actions';
import {
  getCurrentFacet,
  getCurrentPageIndex,
  getFeaturedResults,
  getListingResults,
  getPaging,
  getSearchTerm,
  getFacets,
  getFilters,
  getSearchParams,
} from '../redux/selectors';

import Searchbar from '../components/Searchbar';
import SearchLayout from '../components/SearchLayout';
import ResultCardList from '../components/ResultCardList';
import FeaturedResults from '../components/FeaturedResults';
import Filters from '../components/Filters';
import FacetTabs from '../components/FacetTabs';
import Paging from './Paging.container';

import { getFilteredRoute } from '~/core/redux/selectors/routing';
import ResultsInformation from '~/features/search/components/ResultsInformation';

class RenderSearchResults extends React.Component {
  static propTypes = {
    entry: PropTypes.object,
    currentFacet: PropTypes.string,
    featured: PropTypes.array,
    results: PropTypes.array,
    currentPageIndex: PropTypes.number,
    initListing: PropTypes.func,
    paging: PropTypes.object,
    searchParams: PropTypes.object,
    searchTerm: PropTypes.string,
    facets: PropTypes.object,
    filters: PropTypes.object,
    updateCurrentFacet: PropTypes.func,
    updateSelectedFilters: PropTypes.func,
    updateSearchTerm: PropTypes.func,
    filteredRoute: PropTypes.object,
    accessMethod: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = { term: this.props.searchTerm };
    this.timeout = 0;
  }

  componentDidMount() {
    this.setState({ term: this.props.searchTerm });
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchTerm !== prevProps.searchTerm) {
      this.setState({ term: this.props.searchTerm });
    }
  }

  updateSearchTerm = (term, delayMs = 0) => {
    // Only dispatch updateSearchTerm action after a short timeout
    // to prevent flooding network calls and an unresponsive search box
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => this.props.updateSearchTerm(term), delayMs);
    this.setState({ term });
  };

  render() {
    const {
      currentFacet,
      entry,
      results,
      featured,
      currentPageIndex,
      paging,
      searchParams,
      searchTerm,
      facets,
      updateSelectedFilters,
      updateCurrentFacet,
      filters,
      accessMethod,
    } = this.props;
    const featuredResults =
      currentPageIndex > 0
        ? []
        : featured && featured.filter(f => f.type == 'searchFeaturedResults');
    const oneboxResults =
      featured && featured.filter(f => f.type == 'searchOneboxResults');
    if (entry)
      return (
        <React.Fragment>
          {((!accessMethod.FRAGMENT && typeof window == 'undefined') ||
            (typeof window != 'undefined' &&
              (!window.location.search ||
                (window.location.search &&
                  !window.location.search
                    .toLowerCase()
                    .includes('fragment=true'))))) && (
            <Searchbar
              searchTerm={this.state.term}
              submitSearch={this.updateSearchTerm}
              styleType={'searchPage'}
            />
          )}
          <FacetTabs tabs={facets} updateCurrentFacet={updateCurrentFacet} />
          <SearchLayout
            main={
              <React.Fragment>
                <ResultsInformation paging={paging} searchTerm={searchTerm} />
                {oneboxResults && oneboxResults.length > 0 && (
                  <FeaturedResults
                    cards={oneboxResults}
                    searchTerm={searchTerm}
                  />
                )}
                {featuredResults && featuredResults.length > 0 && (
                  <FeaturedResults
                    cards={featuredResults}
                    searchTerm={searchTerm}
                  />
                )}
                <ResultCardList
                  cards={results}
                  searchTerm={searchTerm}
                  rootUri={searchParams && searchParams.rootUri}
                  contentTypes={searchParams && searchParams.contentTypes}
                  replaceResultsPath={
                    searchParams && searchParams.replaceResultsPath
                  }
                />
                <Paging />
              </React.Fragment>
            }
            aside={
              <Filters
                filters={filters}
                updateSelectedFilters={updateSelectedFilters}
                currentFacet={currentFacet}
              />
            }
          />
        </React.Fragment>
      );
    return null;
  }
}

const mapStateToProps = state => {
  return {
    featured: getFeaturedResults(state),
    results: getListingResults(state),
    currentPageIndex: getCurrentPageIndex(state),
    paging: getPaging(state),
    searchTerm: getSearchTerm(state),
    searchParams: getSearchParams(state),
    facets: getFacets(state),
    filters: getFilters(state),
    filteredRoute: getFilteredRoute(state),
    currentFacet: getCurrentFacet(state),
  };
};

const mapDispatchToProps = {
  initListing: (config, filteredRoute) => initListing(config, filteredRoute),
  updateCurrentFacet: facet => updateCurrentFacet(facet),
  updateSelectedFilters: (filter, key) => updateSelectedFilters(filter, key),
  updateSearchTerm: term => updateSearchTerm(term),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(RenderSearchResults));
