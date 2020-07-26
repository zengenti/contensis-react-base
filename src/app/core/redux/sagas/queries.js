// eslint-disable-next-line import/named
import { Query } from '~/core/util/ContensisDeliveryApi';
import { fieldExpression, defaultExpressions } from '~/core/search/expressions';

export const routeEntryByFieldsQuery = (
  id,
  fields = [],
  versionStatus = 'published'
) => {
  const query = new Query(
    ...[...fieldExpression('sys.id', id), ...defaultExpressions(versionStatus)]
  );
  query.fields = fields;
  return query;
};
