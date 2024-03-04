import { FieldLinkDepths, VersionStatus } from 'contensis-core-api';
import { Query } from 'contensis-delivery-api';
import { fieldExpression, defaultExpressions } from './expressions';

export const routeEntryByFieldsQuery = (
  id: string,
  language = 'en-GB',
  fields: string[] = [],
  fieldLinkDepths: FieldLinkDepths,
  versionStatus: VersionStatus = 'published'
) => {
  const query = new Query(
    ...[
      ...fieldExpression('sys.id', id),
      ...fieldExpression('sys.language', language),
      ...defaultExpressions(versionStatus),
    ]
  );
  query.fields = fields;
  query.fieldLinkDepths = fieldLinkDepths;
  return query;
};
