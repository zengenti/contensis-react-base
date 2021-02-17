// eslint-disable-next-line import/named
import { Query } from '~/core/util/ContensisDeliveryApi';
import { fieldExpression, defaultExpressions } from '~/core/search/expressions';

export const routeEntryByFieldsQuery = (
  id,
  language = 'en-GB',
  fields = [],
  versionStatus = 'published'
) => {
  const query = new Query(
    ...[
      ...fieldExpression('sys.id', id),
      ...fieldExpression('sys.language', language),
      ...defaultExpressions(versionStatus),
    ]
  );
  query.fields = fields;
  return query;
};
