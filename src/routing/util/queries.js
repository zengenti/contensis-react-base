import { Query } from '~/util/ContensisDeliveryApi';
import { fieldExpression, defaultExpressions } from './expressions';

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
