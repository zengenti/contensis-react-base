import { Op, PagedList, Query } from 'contensis-core-api';
import { Entry } from 'contensis-delivery-api/lib/models';
import { Express, RequestHandler } from 'express';
import { expressions as exp, SearchQueryOptions } from '~/search';
import { setCachingHeaders } from '~/util';
import { cachedSearch } from '~/util/ContensisDeliveryApi';
import {
  LinkDepthHierarchy,
  LinkDepthApiConfig,
  LinkDepthApiFilters,
  LinkFields,
  QueryConfigAtLevel,
} from './api.d';

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
  filters,
  sharedFilters,
  linkFields,
}: LinkDepthApiConfig) => {
  try {
    // Recursive function to flatten and index a provided nested config
    const returnFieldIdKeys = (
      obj?: LinkFields,
      level = 1
    ): LinkDepthHierarchy => {
      if (!obj) return {} as any;

      const mappedConfig = Object.entries(obj).map(([k, v]) => ({
        contentTypeIds: Array.isArray(v.contentTypeId)
          ? v.contentTypeId
          : [v.contentTypeId || k],
        fieldId: k,
        filters: v.filters,
        sharedFilters: v.sharedFilters,
      }));

      const inner = Object.entries(obj).map(([k, v]) =>
        returnFieldIdKeys(v.linkFields, level + 1)
      )?.[0];

      return {
        [level]: mappedConfig,
        ...inner,
      } as any;
    };

    const others = returnFieldIdKeys(linkFields);

    // Level 0 is read from the top-level of config
    const contentTypeHierarchy = {
      0: [
        {
          contentTypeIds: Array.isArray(contentTypeId)
            ? contentTypeId
            : [contentTypeId],
          filters,
          sharedFilters,
        },
      ],
      ...others,
    } as LinkDepthHierarchy;

    // The runtime express request handler
    const linkDepthMiddleware: RequestHandler = async (req, res) => {
      try {
        // Short cache duration copied from canterbury project
        setCachingHeaders(res, {
          cacheControl: 'private',
          surrogateControl: '10',
        });

        // Run our queries and provide a final result
        // our params are sourced from the query-string
        const result = await searchEventsTopDown(
          contentTypeHierarchy,
          req.query
        );
        // const result = await searchLinkDepthEntries(
        //   contentTypeHierarchy,
        //   req.query
        // );

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

const getVarsFromConfig = (config: QueryConfigAtLevel[], params: any) => {
  // Build variables from query config to use in our Delivery API Query
  const contentTypeIds = config.map(c => c.contentTypeIds).flat();
  // Filters are the filters we are looking to include with the Query at this level
  let filters = {};
  // Shared filters are filters that share the same querystring key and are valid in multiple levels
  let sharedFilters = {};
  config.forEach(c => {
    filters = { ...filters, ...c.filters };
    sharedFilters = { ...sharedFilters, ...c.sharedFilters };
  });

  // FieldIds are the field name(s) in the parent/current entry that the
  // entries are linked to, used to surface the next level based on id
  // retrieved at the previous level
  const fieldIds = config.map(c => c.fieldId).flat() as string[];

  const queryFilters = makeFilterExpressions(filters, params);
  const sharedQueryFilters = makeFilterExpressions(sharedFilters, params);
  return {
    contentTypeIds,
    fieldIds,
    filters,
    queryFilters,
    sharedFilters,
    sharedQueryFilters,
  };
};

const makeDerivedIdsFilterExpression = (
  level: number,
  resultsAtLevel: [string | string[], Entry[]][],
  ownIds = false,
  useFieldIds = false
) => {
  const previouslyDerivedIdsFilter = [] as {
    key: string | string[];
    values: string[];
    fieldOperator: string;
    logicOperator?: string;
  }[];
  const [prevFieldId, entries] = resultsAtLevel[level];
  const prevKey = prevFieldId;
  const prevResultIds = Util.GetIds(
    entries,
    useFieldIds ? (prevFieldId as string) : undefined
  );
  if (prevKey && prevResultIds?.length > 0)
    previouslyDerivedIdsFilter.push({
      key: ownIds ? 'sys.id' : `${prevFieldId}.sys.id`,
      values: prevResultIds,
      fieldOperator: 'in',
    });
  else
    previouslyDerivedIdsFilter.push({
      key: 'dud',
      values: ['1'],
      fieldOperator: 'in',
    });
  return previouslyDerivedIdsFilter;
};

const searchEventsTopDown = async (
  contentTypeHierarchy: LinkDepthHierarchy,
  params: any
) => {
  // Determine linkDepth for the final query by how many levels are in
  // the contentTypeHierarchy object
  const linkDepth = Object.keys(contentTypeHierarchy).length - 1 || 0;

  // Pre-size our results array to the size of our hierarchy
  const resultsAtLevel = Object.values(contentTypeHierarchy).map((v, i, a) => {
    const fieldId = i === 0 ? a[i + 1][0] : v[0];

    return [fieldId.fieldId, []];
  }) as [string, Entry[]][]; // [fieldId, results][]

  for (const [level, levelConfig] of Object.entries(contentTypeHierarchy)) {
    // LinkDepth level / current index
    const currentLevel = Number(level);

    // Build variables from query config to use in our Delivery API Query
    const { contentTypeIds, fieldIds, queryFilters, sharedQueryFilters } =
      getVarsFromConfig(levelConfig, params);

    // We won't have fetched any derived results to
    // include as a field filter with the very first query
    let previouslyDerivedIdsFilter = [] as {
      key: string | string[];
      values: string[];
      fieldOperator: string;
      logicOperator?: string;
    }[];
    if (currentLevel !== 0) {
      previouslyDerivedIdsFilter = makeDerivedIdsFilterExpression(
        currentLevel - 1,
        resultsAtLevel,
        true,
        true
      );
    }

    const query = searchQuery({
      contentTypeIds,
      filters: queryFilters,
      idFilters: previouslyDerivedIdsFilter,
      sharedFilters: sharedQueryFilters,
      versionStatus: params.versionStatus || 'published',
    } as any);
    // These are all sub-queries, we only want ids returned in these to include
    // them to filter by in our next level(s) queries, along with any other filters
    // configured and found at this level
    query.fields = currentLevel === 0 ? [] : ['sys.id'];
    // Scalability limitation for today
    query.pageSize = 2000;

    const levelQueryResult = await cachedSearch.searchUsingPost(query, 0);
    resultsAtLevel[currentLevel][1] = Util.GetItems(levelQueryResult);
  }

  // Build and run our final query containing all results
  const { contentTypeIds, queryFilters, sharedQueryFilters } =
    getVarsFromConfig(Object.values(contentTypeHierarchy)[0], params);
  const previouslyDerivedIdsFilter = makeDerivedIdsFilterExpression(
    1,
    resultsAtLevel
  );
  const query = finalQuery(
    {
      contentTypeIds,
      filters: queryFilters,
      idFilters: previouslyDerivedIdsFilter,
      sharedFilters: sharedQueryFilters,
      versionStatus: params.versionStatus || 'published',
    } as any,

    Object.entries(contentTypeHierarchy)
      .filter(([k]) => k !== '0')
      .map(([level, levelConfig]) => {
        // LinkDepth level / current index
        const currentLevel = Number(level);

        // Build variables from query config to use in our Delivery API Query
        const { contentTypeIds, queryFilters, sharedQueryFilters } =
          getVarsFromConfig(levelConfig, params);

        const previousIdsFilter = makeDerivedIdsFilterExpression(
          currentLevel,
          resultsAtLevel,
          true
        );

        return {
          contentTypeIds,
          filters: queryFilters,
          idFilters: previousIdsFilter,
          sharedFilters: sharedQueryFilters,
          versionStatus: params.versionStatus || 'published',
        } as any;
      })
  );

  // This is the final query to be run and response returned to the caller
  // Only this bit cares about linkDepth, fields and pagination parameters
  query.fields = JSON.parse(params.fields || '[]') as unknown as string[];
  query.pageSize = params.pageSize as unknown as number;
  query.pageIndex = params.pageIndex as unknown as number;
  query.orderBy = params.orderBy;
  // console.log(JSON.stringify(query.toJSON()));
  const finalQueryResult = await cachedSearch.searchUsingPost(query, linkDepth);

  const entriesWithResolvedParents = await resolveParentEntries(
    contentTypeIds,
    Array.from(
      new Set(resultsAtLevel[1][1].map(e => e.sys.contentTypeId || ''))
    ),
    resultsAtLevel[0][0],
    Util.GetItems(finalQueryResult),
    params
  );
  return { ...finalQueryResult, items: entriesWithResolvedParents };
};

const resolveParentEntries = async (
  parentContentTypeIds: string[],
  replaceContentTypeIds: string[],
  parentFieldId: string,
  results: Entry[],
  params: any
) => {
  // Build variables from query config to use in our Delivery API Query
  const previousIdsFilter = makeDerivedIdsFilterExpression(0, [
    [parentFieldId, results],
  ]) as any;

  const query = searchQuery({
    contentTypeIds: parentContentTypeIds,
    idFilters: previousIdsFilter,
  } as any);
  query.fields = JSON.parse(params.fields || '[]') as unknown as string[];

  console.log(JSON.stringify(query.toJSON()));

  const parentResults = await cachedSearch.search(query, 0);

  return mergeResults(
    results,
    Util.GetItems(parentResults),
    replaceContentTypeIds,
    parentFieldId
  );
};

const mergeResults = (
  results: Entry[],
  parentResults: Entry[],
  replaceContentTypeIds: string[],
  linkFieldId: string
) =>
  results
    .map(r => {
      if (replaceContentTypeIds.some(c => c === r.sys.contentTypeId)) {
        const resolvedParent = parentResults?.find(e =>
          e[linkFieldId]?.some((l: Entry) => l.sys?.id === r.sys.id)
        );
        if (resolvedParent)
          return {
            ...resolvedParent,
            ...r,
            entryTitle: resolvedParent.entryTitle,
            entryDescription: resolvedParent.entryDescription,
            sys: resolvedParent.sys,
            originalSys: r.sys,
          };
        else return r;
      }
      return r;
    })
    .filter(r => r) as Entry[];

const finalQuery = (
  {
    assetTypes,
    contentTypeIds,
    fields,
    filters,
    idFilters,
    sharedFilters,
    pageSize,
    pageIndex,
    orderBy,
    searchTerm,
    versionStatus = 'published',
    webpageTemplates,
    weightedSearchFields,
  }: SearchQueryOptions & {
    idFilters: SearchQueryOptions['filters'];
    sharedFilters: SearchQueryOptions['filters'];
  },
  children: (SearchQueryOptions & {
    idFilters: SearchQueryOptions['filters'];
    sharedFilters: SearchQueryOptions['filters'];
  })[]
) => {
  const expressions = [
    ...exp.defaultExpressions(versionStatus),
    Op.or(
      Op.and(
        ...exp.contentTypeIdExpression(
          contentTypeIds,
          webpageTemplates,
          assetTypes
        ),
        ...exp.filterExpressions(filters),

        Op.or(
          ...exp.filterExpressions(sharedFilters)
          // Op.and(
          //   ...sharedFilters.map(sf =>
          //     Op.not(exp.fieldExpression(sf.key, true, 'exists')[0])
          //   ),
          //   ...exp.filterExpressions(idFilters)
          // )
        )
      ),
      ...children.map(child =>
        Op.and(
          ...exp.contentTypeIdExpression(
            child.contentTypeIds,
            child.webpageTemplates,
            child.assetTypes
          ),
          ...exp.filterExpressions(child.sharedFilters),
          ...exp.filterExpressions(child.idFilters)
        )
      )
    ),
    ...exp.termExpressions(searchTerm, weightedSearchFields),
  ];

  const query = new Query(...expressions);

  query.orderBy = exp.orderByExpression(orderBy);

  if (fields && fields.length > 0) {
    (query as any).fields = fields;
  }

  // (query as any).includeArchived = true;
  // (query as any).includeDeleted = true;
  query.pageIndex = pageIndex;
  query.pageSize = pageSize;
  return query;
};

/**
 * Produce and run a number of Delivery API queries based on a provided
 * contentTypeHierarachy and return a final result set which has been
 * derived ids found from one or more sub-queries
 * @param contentTypeHierarchy an indexed object representing any contentTypeId, filters and fieldId references to build a query from at any given linkDepth level
 * @param params request.query from Express middleware
 * @returns Delivery API search results
 */
const searchLinkDepthEntries = async (
  contentTypeHierarchy: LinkDepthHierarchy,
  params: any
) => {
  // Determine linkDepth for the final query by how many levels are in
  // the contentTypeHierarchy object
  const linkDepth = Object.keys(contentTypeHierarchy).length - 1 || 0;

  // Pre-size our results array to the size of our hierarchy
  const resultsAtLevel = Object.keys(contentTypeHierarchy).map(() => [
    '',
    [],
  ]) as [string | string[], Entry[]][]; // [fieldId, results][]

  // 3, 2, 1 queries...
  // Reverse the contentTypeHierarchy and process each query level
  // Keep the results for any level > 0 and add any ids derived from
  // the previous level results to the current level's query
  for (const [level, levelConfig] of Object.entries(
    contentTypeHierarchy
  ).reverse()) {
    // LinkDepth level / current index
    const currentLevel = Number(level);

    // Build variables from query config to use in our Delivery API Query
    const contentTypeIds = levelConfig.map(c => c.contentTypeIds).flat();
    // Filters are the filters we are looking to include with the Query at this level
    let filters = {};
    // Shared filters are filters that share the same querystring key and are valid in multiple levels
    let sharedFilters = {};
    levelConfig.forEach(c => {
      filters = { ...filters, ...c.filters };
      sharedFilters = { ...sharedFilters, ...c.sharedFilters };
    });

    // FieldIds are the field name(s) in the parent/current entry that the
    // entries are linked to, used to surface the next level based on id
    // retrieved at the previous level
    const fieldIds = levelConfig.map(c => c.fieldId).flat() as string[];

    // We won't have fetched any derived results to
    // include as a field filter with the very first query
    const previouslyDerivedIdsFilter = [] as {
      key: string | string[];
      values: string[];
      fieldOperator: string;
      logicOperator?: string;
    }[];
    if (currentLevel < resultsAtLevel.length - 1) {
      const [prevFieldId, entries] = resultsAtLevel[currentLevel + 1];
      const prevKey = prevFieldId;
      const prevResultIds = Util.GetIds(entries);
      if (prevKey && prevResultIds?.length > 0)
        previouslyDerivedIdsFilter.push({
          key: `${prevFieldId}.sys.id`,
          values: prevResultIds,
          fieldOperator: 'in',
        });
    }

    const queryFilters = makeFilterExpressions(filters, params);
    const sharedQueryFilters = makeFilterExpressions(sharedFilters, params);

    const filtersCount = [
      ...queryFilters,
      ...sharedQueryFilters,
      ...previouslyDerivedIdsFilter,
    ].length;

    const query = searchQuery({
      contentTypeIds,
      filters: queryFilters,
      sharedFilters: [...sharedQueryFilters, ...previouslyDerivedIdsFilter],
      versionStatus: params.versionStatus || 'published',
    } as any);
    // Levels > 0 are sub-queries, we only want ids returned in these to include
    // them to filter by in our next level(s) queries, along with any other filters
    // configured and found at this level
    if (currentLevel !== 0) {
      // We only need to run a sub-query if there is any kind of filters available
      // otherwise we'll just end up returning all records to filter by in the next
      // level's query
      if (filtersCount > 0) {
        query.fields = ['sys.id'];
        // Scalability limitation for today
        query.pageSize = 2000;

        const levelQueryResult = await cachedSearch.search(query, 0);
        resultsAtLevel[currentLevel] = [
          fieldIds,
          Util.GetItems(levelQueryResult),
        ];
      }
    } else {
      // This is the final query to be run and response returned to the caller
      // Only this bit cares about linkDepth, fields and pagination parameters
      query.fields = JSON.parse(params.fields || '[]') as unknown as string[];
      query.pageSize = params.pageSize as unknown as number;
      query.pageIndex = params.pageIndex as unknown as number;
      query.orderBy = params.orderBy;

      const finalQueryResult = await cachedSearch.searchUsingPost(
        query,
        linkDepth
      );

      return finalQueryResult;
    }
  }
};

/**
 * Create a filter expression from a provided filters configuration object
 * and populate them based on the presence of that key in params, filter
 * out any filter keys that do not have a value set in params
 * @param f filters configuration from any level
 * @param params request.query object from Express middleware
 * @returns FilterExpression[] we can use to use with searchQuery function
 */
const makeFilterExpressions = (
  f: LinkDepthApiFilters,
  params: { [param: string]: string }
) =>
  Object.entries(f)
    .map(([paramKey, filterConfig]) => {
      const filterValues = params[paramKey]?.split(',');
      return typeof filterValues !== 'undefined'
        ? {
            key:
              typeof filterConfig === 'object'
                ? filterConfig.fieldId
                : filterConfig,
            values: filterValues,
            fieldOperator:
              typeof filterConfig === 'object'
                ? filterConfig.fieldOperator
                : 'equalTo',
            logicOperator:
              typeof filterConfig === 'object'
                ? filterConfig.logicOperator
                : 'or',
          }
        : null;
    })
    .filter(o => o);

/**
 * Builds our complete Delivery API Query object from a set of provided arguments
 * @param queryParams
 * @returns Delivery API Query
 */
const searchQuery = ({
  assetTypes,
  contentTypeIds,
  customWhere,
  fields,
  filters,
  idFilters,
  sharedFilters,
  pageSize,
  pageIndex,
  orderBy,
  searchTerm,
  versionStatus = 'published',
  webpageTemplates,
  weightedSearchFields,
}: SearchQueryOptions & {
  idFilters: SearchQueryOptions['filters'];
  sharedFilters: SearchQueryOptions['filters'];
}) => {
  const expressions = [
    ...exp.defaultExpressions(versionStatus),
    ...exp.contentTypeIdExpression(
      contentTypeIds,
      webpageTemplates,
      assetTypes
    ),
    ...exp.customWhereExpressions(customWhere),
    ...exp.filterExpressions(filters),
    ...exp.filterExpressions(idFilters),
    ...(sharedFilters?.length > 0
      ? [Op.or(...exp.filterExpressions(sharedFilters, true))]
      : []),
    ...exp.termExpressions(searchTerm, weightedSearchFields),
  ];

  const query = new Query(...expressions);

  query.orderBy = exp.orderByExpression(orderBy);

  if (fields && fields.length > 0) {
    (query as any).fields = fields;
  }

  // (query as any).includeArchived = true;
  // (query as any).includeDeleted = true;
  query.pageIndex = pageIndex;
  query.pageSize = pageSize;
  return query;
};

/**
 * Util class holds our search results helper boilerplate methods
 */
class Util {
  static GetIds(entries: Entry[], fieldId?: string) {
    if (fieldId) {
      return entries
        .map(e =>
          Array.isArray(e?.[fieldId])
            ? e?.[fieldId]?.map((f: Entry) => f?.sys?.id)
            : e?.[fieldId]?.sys?.id || ''
        )
        .flat();
    }
    return entries.map(e => e?.sys?.id || '');
  }

  static GetItems(result: PagedList<Entry>) {
    return this.GetResults(result) ? result.items : [];
  }

  static GetResults(result: PagedList<Entry>) {
    if (result?.items) {
      return result;
    } else {
      return null;
    }
  }
}

export default makeLinkDepthApi;
