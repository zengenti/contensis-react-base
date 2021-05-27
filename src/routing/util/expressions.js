import { Op, OrderBy } from 'contensis-delivery-api';
import { Fields, DataFormats } from '~/schema';
import { fixFreeTextForElastic, extractQuotedPhrases } from './search';

export const fieldExpression = (
  field,
  value,
  operator = 'equalTo',
  weight = null
) => {
  if (!field || !value) return [];
  if (Array.isArray(value)) return equalToOrIn(field, value, operator);
  else
    return !weight
      ? [Op[operator](field, value)]
      : [Op[operator](field, value).weight(weight)];
};

export const contentTypeIdExpression = (contentTypeIds, webpageTemplates) => {
  const expressions = [];
  if (!contentTypeIds && !webpageTemplates) return expressions;

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

  if (expressions.length > 1) return [Op.or(...expressions)];

  return expressions;
};

export const filterExpressions = filters => {
  if (!filters) return [];
  const expressions = [];

  filters.map(param => {
    expressions.push(...fieldExpression(param.key, param.value, 'contains'));
  });

  return expressions;
};

export const dataFormatExpression = (
  contentTypeIds,
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

    const dataFormatExpr = fieldExpression(Fields.sys.dataFormat, dataFormat);

    const withExpr = fieldExpression(
      Fields.sys.contentTypeId,
      withContentTypeIds
    );

    const notExpr = [
      Op.not(...fieldExpression(Fields.sys.contentTypeId, notContentTypeIds)),
    ];

    andExpr.add(...dataFormatExpr);
    if (withContentTypeIds.length > 0) andExpr.add(...withExpr);
    if (notContentTypeIds.length > 0) andExpr.add(...notExpr);

    return [andExpr];
  }
  return [];
};

export const defaultExpressions = versionStatus => {
  return [Op.equalTo(Fields.sys.versionStatus, versionStatus)];
};

export const defaultSearchExpressions = versionStatus => {
  return [
    ...defaultExpressions(versionStatus),
    ...includeInSearchExpressions(),
  ];
};
export const includeInSearchExpressions = () => [
  Op.or(
    Op.and(
      Op.exists(Fields.sys.includeInSearch, true),
      Op.equalTo(Fields.sys.includeInSearch, true)
    ),
    Op.exists(Fields.sys.includeInSearch, false)
  ),
];

export const orderByExpression = orderBy => {
  let expression = OrderBy;
  if (orderBy && orderBy.length > 0) {
    orderBy.map(
      ob =>
        (expression = ob.startsWith('-')
          ? expression.desc(ob.substring(1))
          : expression.asc(ob))
    );
  }
  return expression;
};

const equalToOrIn = (field, arr, operator = 'equalTo') =>
  arr.length === 0
    ? []
    : arr.length === 1
    ? [Op[operator](field, arr[0])]
    : [Op.in(field, ...arr)];

export const customWhereExpressions = where => {
  if (!where || !Array.isArray(where)) return [];

  // Accept HTTP style objects and map them to
  // their equivalent JS client "Op" expressions
  return where.map(clause => {
    let expression;
    Object.keys(clause).map((key, idx) => {
      if (idx === 1) {
        const operator = key;
        const value = clause[key];
        expression = Op[operator](clause.field, value, clause.weight);
      }
    });
    return expression;
  });
};

export const termExpressions = (searchTerm, weightedSearchFields) => {
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
    const operators = [];

    // Helper functions to generate Op expressions
    const containsOp = (f, term) =>
      fieldExpression(
        f.fieldId,
        fixFreeTextForElastic(term),
        'contains',
        f.weight
      );
    const freeTextOp = (f, term) =>
      fieldExpression(
        f.fieldId,
        fixFreeTextForElastic(term),
        'freeText',
        f.weight
      );

    // For each weighted search field
    weightedSearchFields.forEach(f => {
      // Push to field operators
      const fieldOperators = [];

      // Add operator expressions for modified search term
      if (modifiedSearchTerm) {
        if (
          [Fields.keywords, Fields.sys.filename, Fields.sys.uri].includes(
            f.fieldId
          )
        ) {
          fieldOperators.push(...containsOp(f, modifiedSearchTerm));
        } else {
          if ([Fields.entryTitle].includes(f.fieldId)) {
            fieldOperators.push(
              Op.or(
                ...containsOp(f, modifiedSearchTerm),
                ...freeTextOp(f, modifiedSearchTerm)
              )
            );
          } else {
            fieldOperators.push(...freeTextOp(f, modifiedSearchTerm));
          }
        }
      }

      // Add operator expressions for any quoted phrases
      quotedPhrases.forEach(qp => fieldOperators.push(...containsOp(f, qp)));

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
    return [Op.or().addRange(operators)];
  } else if (searchTerm) {
    return [Op.contains(Fields.wildcard, searchTerm)];
  } else {
    return [];
  }
};
