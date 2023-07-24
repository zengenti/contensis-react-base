import { Express, RequestHandler } from 'express';
import LinkDepthSearchService from './LinkDepthSearchService';
import setCachingHeaders from '../caching/setCachingHeaders';
import { LinkDepthApiConfig } from './api.d';

/**
 * Make a LinkDepth api at the uri specified in middlewareConfig.
 * The api supports a GET request and specified filters are supplied as query-string parameters.
 * The response should be a normal Delivery API response.
 * @param app Express app instance
 * @param middlewareConfig Middleware configuration that represents the content types we want to search within, any filters that are required and any linkFields we wish to search within to derive a set of search results from the entries that contain the linkFields. Each key inside of linkFields represents another "linkDepth" of entries and we can specify all the same contentTypeId, filters, and linkFields of their own. There is no currently no limit on how deep these linkFields can go
 * @returns Returns nothing if uri, contentTypeId or linkFields is not set in middlewareConfig
 */
const makeLinkDepthApi = (
  app: Express,
  middlewareConfig: LinkDepthApiConfig
) => {
  const { uri, contentTypeId, linkFields } = middlewareConfig;
  if (!contentTypeId || !linkFields || !uri) return;

  app.get(uri, makeLinkDepthMiddleware(middlewareConfig));
};

/** Create a content type hierarchy from supplied config and produces
 * a RequestHandler function to serve our Express middleware */
const makeLinkDepthMiddleware = ({
  contentTypeId,
  filters = {},
  sharedFilters = {},
  linkFields,
  debug,
}: LinkDepthApiConfig) => {
  try {
    // The runtime express request handler
    const linkDepthMiddleware: RequestHandler = async (req, res) => {
      try {
        // Short cache duration copied from canterbury project
        setCachingHeaders(res, {
          cacheControl: 'private',
          surrogateControl: '10',
        });

        // Gather all params from the request, we will use them at the right query levels later
        const params = Object.fromEntries(
          [...Object.entries(req.params), ...Object.entries(req.query)].map(
            ([k, v]) => [k, v?.toString()]
          )
        );

        const result = await new LinkDepthSearchService({
          contentTypeId,
          linkFields,
          filters,
          sharedFilters,
          params,
          debug,
        }).DoSearch();

        res.json(result);
      } catch (error) {
        // This is a runtime error encountered when processing a given request
        console.error(error);
        res.statusCode = 500;
        res.json(error);
      }
    };

    return linkDepthMiddleware;
  } catch (error) {
    // This will be an error building the middleware
    // we can only serve what the error was as the request handler instead
    console.error(error);
    const errorMiddleware: RequestHandler = async (req, res) => {
      res.statusCode = 500;
      res.json(JSON.stringify(error));
    };
    return errorMiddleware;
  }
};

export default makeLinkDepthApi;
