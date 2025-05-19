import {
  ContensisQueryOrderBy,
  IExpression,
  ILogicalExpression,
  Op,
  OrderBy,
  VersionStatus,
} from 'contensis-core-api';
import { Fields, DataFormats } from '../search/schema';
import { fixFreeTextForElastic, extractQuotedPhrases } from './util';
import { CustomWhereClause, WeightedSearchField } from '../models/Search';
import { FieldOperators, FilterExpression } from '../models/Queries';

export const fieldExpression = (
  field: string | string[],
  value: any,
  operator: FieldOperators = 'equalTo',
  weight?: number,
  fuzzySearch = false
): IExpression[] => {
  if (!field || !value || (Array.isArray(value) && value.length === 0))
    return [];
  if (Array.isArray(field))
    // If an array of fieldIds have been provided, call self for each fieldId
    // to generate expressions that are combined with an 'or' operator
    return [
      Op.or(
        ...field
          .map(fieldId =>
            fieldExpression(fieldId, value, operator, weight, fuzzySearch)
          )
          .flat()
      ),
    ];

  if (operator === 'between') return between(field, value);
  if (Array.isArray(value))
    return equalToOrIn(field, value, operator, fuzzySearch);
  else
    return !weight
      ? equalToOrIn(field, value, operator, fuzzySearch)
      : [equalToOrIn(field, value, operator, fuzzySearch)[0].weight(weight)];
};

export const contentTypeIdExpression = (
  contentTypeIds: string[],
  webpageTemplates?: string[],
  assetTypes?: string[]
) => {
  const expressions: ILogicalExpression[] = [];
  if (!contentTypeIds && !webpageTemplates && !assetTypes) return expressions;

  if (contentTypeIds && contentTypeIds.length > 0) {
    expressions.push(
      ...dataFormatExpression(contentTypeIds, DataFormats.entry)
    );
  }

  if (webpageTemplates && webpageTemplates.length > 0) {
    expressions.push(
      ...dataFormatExpression(webpageTemplates, DataFormats.webpage)
    );
  }

  if (assetTypes && assetTypes.length > 0) {
    expressions.push(...dataFormatExpression(assetTypes, DataFormats.asset));
  }

  if (expressions.length > 1) return [Op.or(...expressions)];

  return expressions;
};

export const filterExpressions = (
  filters: FilterExpression[],
  isOptional = false
) => {
  if (!filters) return [];
  const expressions: IExpression[] = [];
  filters.map(selectedFilter => {
    if (selectedFilter.logicOperator === 'and')
      // using 'and' logic operator we loop through each filter
      // and loop through all values to add an expression for each filter value
      selectedFilter.values.forEach(value =>
        expressions.push(
          ...fieldExpression(
            selectedFilter.key,
            value,
            selectedFilter.fieldOperator || 'equalTo'
          )
        )
      );
    else if (selectedFilter.logicOperator === 'not') {
      const fieldExpressions = fieldExpression(
        selectedFilter.key,
        selectedFilter.values,
        selectedFilter.fieldOperator || 'in'
      );
      fieldExpressions.forEach(expr => {
        expressions.push(Op.not(expr));
      });
    }
    // using 'or' logic operator we loop over each filter
    // and simply add the array of values to an expression with an 'in' operator
    else
      expressions.push(
        ...fieldExpression(
          selectedFilter.key,
          selectedFilter.values,
          selectedFilter.fieldOperator || 'in'
        )
      );

    if (isOptional)
      expressions.push(
        Op.not(fieldExpression(selectedFilter.key, true, 'exists')[0])
      );
  });

  return expressions;
};

export const dataFormatExpression = (
  contentTypeIds: string[],
  dataFormat = DataFormats.entry
) => {
  if (contentTypeIds && contentTypeIds.length > 0) {
    /**
     * We have an array of contentTypeIds some may be prefixed with a "!"
     * to indicate this is a "not" expression
     */
    const withContentTypeIds = contentTypeIds.filter(c => !c.startsWith('!'));
    const notContentTypeIds = contentTypeIds
      .filter(c => c.startsWith('!'))
      .map(id => id.substring(1));

    const andExpr = Op.and();

    const dataFormatExpr = fieldExpression(
      Fields.sys.dataFormat,
      dataFormat
    )[0];

    const withExpr = fieldExpression(
      Fields.sys.contentTypeId,
      withContentTypeIds
    )[0];

    const notExpr = Op.not(
      fieldExpression(Fields.sys.contentTypeId, notContentTypeIds)[0]
    );

    andExpr.add(dataFormatExpr);
    if (withContentTypeIds.length > 0 && withExpr) andExpr.add(withExpr);
    if (notContentTypeIds.length > 0 && notExpr) andExpr.add(notExpr);

    return [andExpr];
  }
  return [];
};

export const featuredResultsExpression = ({
  contentTypeId,
  fieldId,
  fieldValue = true,
}: {
  contentTypeId?: string | string[];
  fieldId?: string | string[];
  fieldValue?: boolean;
} = {}) => {
  const expressions = [] as IExpression[];

  if (contentTypeId) {
    expressions.push(
      ...contentTypeIdExpression(
        Array.isArray(contentTypeId) ? contentTypeId : [contentTypeId]
      )
    );
  }

  if (fieldId && fieldValue) {
    expressions.push(...fieldExpression(fieldId, fieldValue));
  }

  return expressions;
};

export const languagesExpression = (languages: string[]) =>
  fieldExpression(Fields.sys.language, languages);

export const includeInSearchExpressions = (
  webpageTemplates: string[],
  includeInSearchFields: string[]
) => {
  const expressions = [] as IExpression[];
  // Or include this expression if we have explicity specified non-default includeInSearch fields
  if (Array.isArray(includeInSearchFields))
    expressions.push(
      ...includeInSearchFields.map(includeInSearchField =>
        Op.or(
          Op.and(
            Op.exists(includeInSearchField, true),
            Op.equalTo(includeInSearchField, true)
          ),
          Op.exists(includeInSearchField, false)
        )
      )
    );

  // If webpageTemplates have been specified, include this expression
  // with the default includeInSearch field from classic Contensis.
  if (Array.isArray(webpageTemplates) && webpageTemplates.length > 0)
    expressions.push(
      Op.or(
        Op.and(
          Op.exists(Fields.sys.includeInSearch, true),
          Op.equalTo(Fields.sys.includeInSearch, true)
        ),
        Op.exists(Fields.sys.includeInSearch, false)
      )
    );
  return expressions;
};

export const defaultExpressions = (versionStatus: VersionStatus) => {
  return [Op.equalTo(Fields.sys.versionStatus, versionStatus)];
};

export const includeIdsExpression = (includeIds: string[]) => {
  if (Array.isArray(includeIds) && includeIds.length > 0) {
    return fieldExpression(Fields.sys.id, includeIds);
  } else return [];
};

export const excludeIdsExpression = (excludeIds: string[]) => {
  if (Array.isArray(excludeIds) && excludeIds.length > 0) {
    const [expr] = fieldExpression(Fields.sys.id, excludeIds);
    return [Op.not(expr)];
  } else return [];
};

export const orderByExpression = (orderBy: string[]) => {
  let expression: ContensisQueryOrderBy | undefined;
  if (orderBy && orderBy.length > 0) {
    expression = OrderBy;
    for (const ob of orderBy) {
      expression = ob.startsWith('-')
        ? expression?.desc(ob.substring(1))
        : expression?.asc(ob);
    }
  }
  return expression as ContensisQueryOrderBy;
};

const equalToOrIn = (
  field: string,
  value: string | string[],
  operator: FieldOperators = 'equalTo',
  fuzzySearch = false
) => {
  if (value.length === 0) return [];
  if (Array.isArray(value)) {
    if (operator === 'equalTo' || operator === 'in')
      return [Op.in(field, ...value)];
    const expressions = value.map(innerValue => {
      switch (operator) {
        case 'between':
          return between(field, innerValue)?.[0];
        case 'distanceWithin':
          return distanceWithin(field, innerValue)?.[0];
        case 'exists':
          return Op.exists(field, innerValue as any);
        case 'freeText':
          // TODO: Potentially needs further implementation of new options
          return Op[operator](field, innerValue, fuzzySearch, undefined);
        default:
          return Op[operator](field, innerValue);
      }
    });
    return expressions?.length > 1
      ? [Op.or(...expressions)]
      : expressions || [];
  }
  switch (operator) {
    case 'between':
      return between(field, value);
    case 'distanceWithin':
      return distanceWithin(field, value);
    case 'freeText':
      // TODO: Potentially needs further implementation of new options
      return [Op.freeText(field, value, fuzzySearch, undefined)];
    default:
      return [Op[operator](field, value)];
  }
};

const between = (field: string, value: string | string[]) => {
  const handle = (betweenValue: string) => {
    const valArr = betweenValue.split('--');
    if (valArr.length > 1) {
      const [minimum, maximum] = valArr;
      return Op.between(field, minimum, maximum);
    } else {
      // eslint-disable-next-line no-console
      console.log(
        `[search] You have supplied only one value to a "between" operator which must have two values. Your supplied value "${
          valArr.length && valArr[0]
        }" has been discarded.`
      );
      return false;
    }
  };

  if (value.length === 0) return [];
  if (Array.isArray(value))
    return [
      Op.or(...(value.map(handle).filter(bc => bc !== false) as IExpression[])),
    ];

  const op = handle(value);
  return op ? [op] : [];
};

const distanceWithin = (field: string, value: string | string[]) => {
  const handle = (distanceValue: string) => {
    const valArr = distanceValue.split(' ');
    if (valArr.length > 1) {
      const [lat, lon] = valArr;
      return Op.distanceWithin(
        field,
        Number(lat),
        Number(lon),
        valArr?.[2] || '10mi'
      );
    } else {
      // eslint-disable-next-line no-console
      console.log(
        `[search] You have supplied only one value to a "distanceWithin" operator which must be made up of "lat,lon,distance". Your supplied value "${
          valArr.length && valArr[0]
        }" has been discarded.`
      );
      return false;
    }
  };

  if (value.length === 0) return [];
  if (Array.isArray(value))
    return [
      Op.or(...(value.map(handle).filter(bc => bc !== false) as IExpression[])),
    ];

  const op = handle(value);
  return op ? [op] : [];
};

/**
 * Accept HTTP style objects and map them to
 * their equivalent JS client "Op" expressions
 * @param {array} where the where array as you'd provide it to the HTTP API
 * @returns {array} array of constructed Delivery API Operators
 */
export const customWhereExpressions = (where?: CustomWhereClause) => {
  if (!where || !Array.isArray(where)) return [];

  // Map each clause inside the where array
  return where.map(clause => {
    let expression: IExpression | undefined;
    // Map through each property in the clause so we can
    // capture the values required and reconstruct them as
    // a Delivery API expression
    let operator: 'field' | 'not' | 'and' | 'or' | FieldOperators;
    Object.keys(clause).map((key: string, idx) => {
      // The clause may contain only one key
      if (idx === 0) operator = key as 'not' | 'and' | 'or';

      const field: string = (clause as any).field;
      const value = (clause as any)[
        Object.keys(clause).find(k => !['field', 'weight'].includes(k)) || ''
      ];
      const weight: number = (clause as any).weight;

      if (idx === 0) {
        if (operator === 'and' || operator === 'or') {
          // These are array expressions so we can call ourself recursively
          // to map these inner values to expressions
          const recurseExpr = customWhereExpressions(
            (clause as any)[operator]
          ) as unknown as IExpression[];
          expression = Op[operator](...recurseExpr);
        }

        if (['not'].includes(operator)) {
          // A 'not' expression is an object with only one inner field and inner operator
          Object.keys(value).map((notKey, notIdx) => {
            const innerOperator = notKey as Exclude<
              FieldOperators,
              'distanceWithin' // these are not handled
            >;
            const innerValue = value[notKey];
            const innerField = value.field;
            // Map the expression when we've looped and scoped to
            // the second property inside the clause
            if (notIdx === 1)
              expression = Op.not(
                makeJsExpression(innerOperator, innerField, innerValue)
              );
          });
        }
      }
      // Map the expression when we've looped and scoped to
      // the second property inside the clause
      operator = Object.keys(clause).find(
        clauseKey => !['field', 'weight'].includes(clauseKey)
      ) as FieldOperators;

      if (idx === 1) {
        expression = makeJsExpression(operator, field, value);

        if (typeof weight === 'number') expression = expression.weight(weight);
      }
    });
    return expression;
  }) as IExpression[];
};

const makeJsExpression = (
  operator: FieldOperators,
  field: string,
  value: any
) =>
  operator === 'freeText' || operator === 'contains'
    ? Op[operator](field, value)
    : operator === 'in'
    ? Op[operator](field, ...value)
    : operator === 'exists'
    ? Op[operator](field, value)
    : operator === 'between'
    ? Op[operator](field, value[0], value[1])
    : operator === 'distanceWithin'
    ? Op[operator](field, value?.lat, value?.lon, value?.distance)
    : Op[operator](field, value);

export const termExpressions = (
  searchTerm: string,
  weightedSearchFields: WeightedSearchField[],
  fuzzySearch?: boolean,
  omitSearchFields: string[] = []
) => {
  if (searchTerm && weightedSearchFields && weightedSearchFields.length > 0) {
    // Extract any phrases in quotes to array
    const quotedPhrases = extractQuotedPhrases(searchTerm);

    // Modify the search term to remove any quoted phrases to leave any remaining terms
    let modifiedSearchTerm = searchTerm;
    quotedPhrases.forEach(
      qp =>
        (modifiedSearchTerm = modifiedSearchTerm
          .replace(qp, '')
          .replace('""', '')
          .trim())
    );

    // Push to the operators array to include in the query
    const operators = [] as IExpression[];

    // Helper functions to generate Op expressions
    const containsOp = (f: WeightedSearchField, term: string) =>
      fieldExpression(
        f.fieldId,
        fixFreeTextForElastic(term),
        'contains',
        f.weight
      );
    const freeTextOp = (f: WeightedSearchField, term: string) =>
      fieldExpression(
        f.fieldId,
        fixFreeTextForElastic(term),
        'freeText',
        f.weight,
        fuzzySearch
      );

    // For each weighted search field
    weightedSearchFields.forEach(wsf => {
      // Push to field operators
      const fieldOperators: IExpression[] = [];

      // Add operator expressions for modified search term
      if (modifiedSearchTerm) {
        if (
          [Fields.keywords, Fields.sys.filename, Fields.sys.uri].includes(
            wsf.fieldId
          )
        ) {
          fieldOperators.push(...containsOp(wsf, modifiedSearchTerm));
        } else {
          if ([Fields.entryTitle].includes(wsf.fieldId)) {
            fieldOperators.push(
              Op.or(
                ...containsOp(wsf, modifiedSearchTerm),
                ...freeTextOp(wsf, modifiedSearchTerm)
              )
            );
          } else {
            fieldOperators.push(...freeTextOp(wsf, modifiedSearchTerm));
          }
        }
      }

      // Add operator expressions for any quoted phrases
      quotedPhrases.forEach(qp => fieldOperators.push(...containsOp(wsf, qp)));

      // If we are using multiple operators for a field we will
      // wrap each field inside an And operator so we will match
      // all terms/phrases rather than any terms/phrases
      if (fieldOperators.length > 1) {
        operators.push(Op.and(...fieldOperators));
      } else {
        operators.push(...fieldOperators);
      }
    });

    // Wrap operators in an Or operator
    const expressions = Op.or().addRange(operators);

    if (!omitSearchFields.find(sf => sf === Fields.searchContent))
      // include "searchContent" field by default unless omitted
      return [
        expressions.add(
          Op.freeText(Fields.searchContent, searchTerm, fuzzySearch)
        ),
      ];
    else return [expressions];
  } else if (searchTerm) {
    // Searching without weightedSearchFields defined will fall back
    // to a default set of search fields with arbritary weights set.

    const exp: IExpression[] = [];

    if (!omitSearchFields.find(sf => sf === Fields.entryTitle)) {
      exp.push(Op.equalTo(Fields.entryTitle, searchTerm).weight(10));
      exp.push(
        Op.freeText(Fields.entryTitle, searchTerm, fuzzySearch).weight(2)
      );
    }
    if (!omitSearchFields.find(sf => sf === Fields.entryDescription))
      exp.push(
        Op.freeText(Fields.entryDescription, searchTerm, fuzzySearch).weight(2)
      );
    if (!omitSearchFields.find(sf => sf === Fields.keywords))
      exp.push(Op.contains(Fields.keywords, searchTerm).weight(2));
    if (!omitSearchFields.find(sf => sf === Fields.sys.uri))
      exp.push(Op.contains(Fields.sys.uri, searchTerm).weight(2));
    if (!omitSearchFields.find(sf => sf === Fields.sys.allUris))
      exp.push(Op.contains(Fields.sys.allUris, searchTerm));
    if (!omitSearchFields.find(sf => sf === Fields.searchContent))
      exp.push(Op.freeText(Fields.searchContent, searchTerm, fuzzySearch));
    return [Op.or(...exp)];
  } else {
    return [];
  }
};
