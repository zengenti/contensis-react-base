import { Express } from 'express';
import { LinkDepthApiConfig } from './api.d';
/**
 * Make a LinkDepth api at the uri specified in middlewareConfig.
 * The api supports a GET request and specified filters are supplied as query-string parameters.
 * The response should be a normal Delivery API response.
 * @param app Express app instance
 * @param middlewareConfig Middleware configuration that represents the content types we want to search within, any filters that are required and any linkFields we wish to search within to derive a set of search results from the entries that contain the linkFields. Each key inside of linkFields represents another "linkDepth" of entries and we can specify all the same contentTypeId, filters, and linkFields of their own. There is no currently no limit on how deep these linkFields can go
 * @returns Returns nothing if uri, contentTypeId or linkFields is not set in middlewareConfig
 */
declare const makeLinkDepthApi: (app: Express, middlewareConfig: LinkDepthApiConfig) => void;
export default makeLinkDepthApi;
