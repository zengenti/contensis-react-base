import { Query } from '~/util/ContensisDeliveryApi';
import { fieldExpression, defaultExpressions } from './expressions';

export const routeEntryByFieldsQuery = (
  id: string,
  language = 'en-GB',
  fields: string[] = [],
  versionStatus: 'published' | 'latest' = 'published'
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
