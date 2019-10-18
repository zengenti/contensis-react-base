import { deliveryApi, Query, Op } from '~/core/util/ContensisDeliveryApi';
import { createSearchQuery, fixFreeTextForElastic } from '~/core/util/search';
import ProjectHelper from '~/core/util/helpers';

export class SearchApiHandler {
  static env;
  static project;

  constructor(env, project = 'website') {
    this.env = env;
    this.project = project;
  }

  async PresentSearchSuggestions(profile, partial_query) {
    let searchParamsEntry, searchParams;
    let suggestions = [];
    const results = await this.GetSearchParamsEntry(
      profile == '_default' ? 'search' : profile.replace(/_/g, '-')
    );

    searchParamsEntry =
      results.totalCount && results.totalCount > 0 ? results.items[0] : null;

    if (searchParamsEntry) {
      searchParams = ProjectHelper.composedFieldToObject(
        searchParamsEntry.configuration
      );

      searchParams = {
        ...searchParams,
        context: 'suggestions',
        versionStatus: 'published',
        fields: ['entryTitle'],
        searchTerm: partial_query,
        pageSize: 1000, // set this higher than needed as we need to dedupe any results later
      };

      const searchResults = await this.GetSearchSuggestions(searchParams);
      suggestions =
        searchResults.totalCount && searchResults.totalCount > 0
          ? searchResults.items.map(entry =>
              fixFreeTextForElastic(entry.entryTitle.toLowerCase())
            )
          : [];
    }

    return (
      ProjectHelper.dedupeArray(suggestions)
        //.sort((a, b) => a.length - b.length)
        .slice(0, 10)
    );
  }

  async GetSearchParamsEntry(slug = 'search') {
    try {
      const query = new Query(
        Op.equalTo('sys.versionStatus', 'published'),
        Op.or(Op.equalTo('sys.slug', slug), Op.equalTo('sys.id', slug))
      );
      return await deliveryApi.search(query, 1, 'website', this.env);
    } catch (ex) {
      SearchApiHandler.LogError(
        ex,
        `Problem getting search params entry '${slug}'`
      );
    }
  }

  async GetSearchSuggestions(params) {
    try {
      const query = createSearchQuery(params);

      return await deliveryApi.search(query, 0, 'website', this.env);
    } catch (ex) {
      SearchApiHandler.LogError(
        ex,
        `Problem getting search suggestions with params '${JSON.stringify(
          params
        )}'`
      );
    }
  }

  static LogError(ex, message) {
    /* eslint-disable no-console */
    console.log(`${message}: ${ex}
    ${ex.stack}`);
    /* eslint-enable no-console */
  }
}
