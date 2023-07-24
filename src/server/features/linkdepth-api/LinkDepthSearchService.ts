/* eslint-disable no-console */
import { cachedSearch } from '~/util/ContensisDeliveryApi';
import { LinkDepthApiConfig, LinkDepthApiFilters, LinkFields } from './api.d';
import QueryLevelResults from './QueryLevelResults';
import {
  finalQuery,
  makeDerivedIdsFilterExpression,
  makeFilterExpressions,
  resolveParentEntries,
} from './search';

export type LinkDepthSearchServiceConstuctorArgs =
  Partial<LinkDepthApiConfig> & {
    params: { [key: string]: string | undefined };
    debug?: boolean;
  };

class LinkDepthSearchService {
  contentTypeIds: string[];
  filters: LinkDepthApiFilters;
  sharedFilters: LinkDepthApiFilters;
  linkFields: LinkFields;
  params: { [key: string]: string | undefined };
  debug: boolean;

  queryLevels: QueryLevelResults[];

  constructor({
    contentTypeId = '',
    filters = {},
    sharedFilters = {},
    linkFields = {},
    params,
    debug = false,
  }: LinkDepthSearchServiceConstuctorArgs) {
    this.contentTypeIds = Array.isArray(contentTypeId)
      ? contentTypeId
      : [contentTypeId];
    this.filters = filters;
    this.sharedFilters = sharedFilters;
    this.linkFields = linkFields;
    this.params = params;
    this.debug = debug;

    this.queryLevels = this.InitQueryLevels();
  }

  DoSearch = async () => {
    // Run queries "top-down" through each level of `linkField`
    for (const queryLevel of this.queryLevels) {
      await queryLevel.RunFirstQuery();
    }

    // Run queries "bottom-up" through each level of `linkField`
    for (const queryLevel of [...this.queryLevels].reverse()) {
      await queryLevel.RunFinalQuery();
    }

    // Run a final query that will aggregate the results from all levels
    // adding all levels to the query that have `returnEntries` set true
    return await this.RunFinalQueries();
  };

  RunFinalQueries = async () => {
    const finalQueryLevels = this.queryLevels.filter(
      ql =>
        (ql.level > 0 && ql.returnEntries) ||
        (ql.level === 0 && ql.returnEntries !== false)
    );

    // Decide if we need a further final query if any child level(s) have had `returnEntries` set to true
    if (
      finalQueryLevels.length > 1 ||
      (finalQueryLevels.length === 1 && finalQueryLevels[0].level !== 0)
    ) {
      // Build final query
      const { contentTypeIds, filters, sharedFilters, params } = this;
      const derivedIds =
        finalQueryLevels[0].children
          .filter(ql => !ql.returnEntries)
          .map(ql => ql.validatedLinks)
          .flat() || [];
      const derivedIdFilters =
        derivedIds
          .map(vl =>
            makeFilterExpressions(
              {
                [vl.linkFieldId]: {
                  fieldId: `${vl.linkFieldId}.sys.id`,
                },
              },
              {
                [vl.linkFieldId]:
                  vl.entryIds.join(',') || 'no results for filter',
              }
            )
          )
          .flat() || [];
      // This is the final query to be run and response returned to the caller
      // Only this bit cares about linkDepth, fields and pagination parameters
      const query = finalQuery(
        {
          contentTypeIds,
          filters: makeFilterExpressions(filters, params),
          sharedFilters: makeFilterExpressions(sharedFilters, params),
          idFilters: derivedIdFilters,
          fields: params.fields
            ? [
                ...JSON.parse(params.fields),
                ...finalQueryLevels
                  .map(l => l.parent?.linkFieldIds || [])
                  .flat(),
              ]
            : [],
          orderBy: params.orderBy?.split(','),
          pageIndex: Number(params.pageIndex) || 0,
          pageSize:
            typeof Number(params.pageSize) === 'number'
              ? Number(params.pageSize)
              : 25,
          searchTerm: params.term,
          versionStatus: params.versionStatus as any,
        },
        finalQueryLevels?.[0].children
          .filter(ql => ql.returnEntries)
          .map(ql => {
            const entriesAtLevel =
              ql.GetResultsEntries() || ql.parent?.GetResultsEntries();
            const previousIdsFilter =
              ql.returnEntries || !!ql.children.some(qc => qc.returnEntries)
                ? ql.parent?.linkFieldIds
                    .map(fieldId =>
                      makeDerivedIdsFilterExpression(
                        fieldId,
                        entriesAtLevel,
                        true,
                        ql.runFinalQuery
                      )
                    )
                    .flat()
                : [];
            return {
              contentTypeIds: ql.contentTypeIds,
              filters: makeFilterExpressions(ql.filters, params),
              sharedFilters: makeFilterExpressions(ql.sharedFilters, params),
              idFilters: previousIdsFilter,
            };
          }) || []
      );
      if (this.debug)
        console.log(
          `\nFinal query: ${derivedIds.reduce(
            (accumulator, object) => accumulator + object.entryIds.length,
            0
          )} derived ids \n${JSON.stringify(query.toJSON()).substring(0, 1000)}`
        );

      const finalQueryResult = await cachedSearch.searchUsingPost(
        query,
        Number(params.linkDepth) || 0,
        params.projectId
      );

      // Resolve any parent entries

      const resolveParentLevels = finalQueryLevels.filter(
        ql => ql.resolveFirstParent
      );

      let entries = finalQueryResult.items;

      for (const resolveParents of resolveParentLevels) {
        entries = await resolveParentEntries(
          resolveParents.parent?.contentTypeIds || [],
          resolveParents.contentTypeIds,
          resolveParents.parent?.linkFieldIds[0] || 'unknown',
          finalQueryResult.items, // or entries?
          this.params,
          this.debug
        );
      }

      return { ...finalQueryResult, items: entries };
    } else {
      if (this.debug) console.log(`\nNo further queries required\n`);
      return this.queryLevels.find(ql => ql.level === 0)?.GetResults();
    }
  };

  private InitQueryLevels = () => {
    const createChildQueryLevels = (
      linkFields: LinkFields,
      parentQueryLevel: QueryLevelResults,
      level = 1
    ): QueryLevelResults[] => {
      return Object.entries(linkFields)
        .map(
          ([
            ,
            {
              contentTypeId = '',
              filters = {},
              linkFields = {},
              resolveFirstParent,
              returnEntries,
              sharedFilters = {},
            },
          ]) => {
            const thisLevel = new QueryLevelResults({
              level,
              contentTypeIds: Array.isArray(contentTypeId)
                ? contentTypeId
                : [contentTypeId],
              filters: Object.fromEntries(
                Object.entries(filters).map(([fKey, fVal]) => [
                  fKey,
                  typeof fVal === 'string' ? { fieldId: fVal } : fVal,
                ])
              ),
              sharedFilters: Object.fromEntries(
                Object.entries(sharedFilters).map(([fKey, fVal]) => [
                  fKey,
                  typeof fVal === 'string' ? { fieldId: fVal } : fVal,
                ])
              ),
              linkFields,
              parent: parentQueryLevel,
              params,
              resolveFirstParent,
              returnEntries,
              debug: this.debug,
            });

            parentQueryLevel.AddChild({ child: thisLevel });

            return [
              thisLevel,
              ...createChildQueryLevels(linkFields, thisLevel, level + 1),
            ];
          }
        )
        .flat();
    };
    const { contentTypeIds, filters, sharedFilters, linkFields, params } = this;

    const firstLevel = new QueryLevelResults({
      level: 0,
      contentTypeIds,
      filters: Object.fromEntries(
        Object.entries(filters).map(([fKey, fVal]) => [
          fKey,
          typeof fVal === 'string' ? { fieldId: fVal } : fVal,
        ])
      ),
      sharedFilters: Object.fromEntries(
        Object.entries(sharedFilters).map(([fKey, fVal]) => [
          fKey,
          typeof fVal === 'string' ? { fieldId: fVal } : fVal,
        ])
      ),
      linkFields,
      params,
      debug: this.debug,
    });

    const queryLevels = [
      firstLevel,
      ...createChildQueryLevels(linkFields, firstLevel),
    ];
    // return queryLevels;

    // If we are only returning entries from level 0
    // we can skip running the first query and finalQuery will suffice
    if (queryLevels.find(ql => ql.returnEntries && ql.level !== 0))
      return queryLevels;
    else
      return queryLevels.map(ql => {
        ql.runFirstQuery = false;
        // ql.runFinalQuery = false;
        return ql;
      });
  };
}

export default LinkDepthSearchService;
