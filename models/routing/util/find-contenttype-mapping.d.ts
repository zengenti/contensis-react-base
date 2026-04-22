import { ContentTypeMapping, MatchedRoute } from "../../models";
export declare const findContentTypeMapping: (ContentTypeMappings: ContentTypeMapping[], contentTypeId: string) => ContentTypeMapping | undefined;
/** Find a searchOptions object in any of the current routes */
export declare const getSearchOptions: (staticRoute: MatchedRoute, contentTypeRoute: ContentTypeMapping) => any;
