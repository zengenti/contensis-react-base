import { deliveryApi, Query, Op } from '~/core/util/ContensisDeliveryApi';
import { createSearchQuery } from '~/core/util/search';
import ProjectHelper from '~/core/util/helpers';
import bindCardProps from '~/features/search/utils/bindCardProps';

export class SearchRankingTester {
  static env;
  static project;
  static paramsEntry = {};
  static cachedResults = {};
  static profile;

  constructor(env, project = 'website') {
    this.env = env;
    this.project = project;
    this.paramsEntry = {};
    this.cachedResults = {};
    this.profile = 'search';
  }

  async PresentSearchResults(searchTerm) {
    if (!this.paramsEntry[this.profile]) {
      const results = await this.GetSearchParamsEntry(
        this.profile == '_default' ? 'search' : this.profile.replace(/_/g, '-')
      );

      this.paramsEntry[this.profile] =
        results.totalCount && results.totalCount > 0 ? results.items[0] : null;
    }

    if (this.paramsEntry[this.profile] || this.cachedResults[searchTerm]) {
      let searchParams;
      searchParams = ProjectHelper.composedFieldToObject(
        this.paramsEntry[this.profile].configuration
      );

      searchParams = {
        ...searchParams,
        context: 'test',
        versionStatus: 'published',
        fields: ['entryTitle', 'url', 'sys', 'keywords'],
        searchTerm,
        pageSize: 2000,
      };

      const searchResults = await this.GetSearchResults(searchParams);

      this.cachedResults[searchTerm] =
        searchResults.totalCount && searchResults.totalCount > 0
          ? searchResults.items
          : [];
    }

    return this.cachedResults[searchTerm];
  }

  async GetSearchParamsEntry(slug = 'search') {
    try {
      const query = new Query(
        Op.equalTo('sys.versionStatus', 'published'),
        Op.or(Op.equalTo('sys.slug', slug), Op.equalTo('sys.id', slug))
      );
      return await deliveryApi.search(query, 1, 'website', this.env);
    } catch (ex) {
      SearchRankingTester.LogError(
        ex,
        `Problem getting search params entry '${slug}'`
      );
    }
  }

  async GetSearchResults(params) {
    try {
      const query = createSearchQuery(params);

      return await deliveryApi.search(query, 0, 'website', this.env);
    } catch (ex) {
      SearchRankingTester.LogError(
        ex,
        `Problem getting search results with params '${JSON.stringify(params)}'`
      );
    }
  }

  async RankSearchResult(searchTerm, url) {
    const results = this.cachedResults[searchTerm];

    // const urlToMatch =
    //   url.startsWith('http') && url.includes('www.hertfordshire.gov.uk')
    //     ? '/' +
    //       url
    //         .split('/')
    //         .splice(3)
    //         .join('/')
    //         .toLowerCase()
    //     : url.toLowerCase();

    if (results && results.length > 0) {
      const searchParamsEntry = this.paramsEntry[this.profile];
      const searchParams = ProjectHelper.composedFieldToObject(
        searchParamsEntry.configuration
      );
      const resultCards = results.map(r =>
        bindCardProps(
          r,
          searchParams.rootUri,
          searchParams.contentTypes,
          searchParams.replaceResultsPath
        )
      );
      // const resultsUrls = results.map(r => (r.url || r.sys.uri).toLowerCase());

      const rankIndex = resultCards.findIndex(
        u => u.linkPath.toLowerCase() == url.toLowerCase()
      );

      return {
        term: searchTerm,
        url,
        rank: rankIndex + 1,
        totalResults: results.length,
        keywords: rankIndex >= 0 ? results[rankIndex].keywords : null,
      };
    }
    return {
      term: searchTerm,
      url,
      rank: 'n/a',
      totalResults: 0,
      keywords: null,
    };
  }

  static LogError(ex, message) {
    /* eslint-disable no-console */
    console.log(`${message}: ${ex}
    ${ex.stack}`);
    /* eslint-enable no-console */
  }
}
