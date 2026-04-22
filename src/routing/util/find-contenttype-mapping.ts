import { ContentTypeMapping, MatchedRoute } from '~/models';

export const findContentTypeMapping = (
  ContentTypeMappings: ContentTypeMapping[],
  contentTypeId: string
) => ContentTypeMappings.find(ct => ct.contentTypeID === contentTypeId);

/** Find a searchOptions object in any of the current routes */
export const getSearchOptions = (
  staticRoute: MatchedRoute,
  contentTypeRoute: ContentTypeMapping
) => staticRoute?.route?.searchOptions || contentTypeRoute?.searchOptions;
