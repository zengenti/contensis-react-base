import { FieldLinkDepths, VersionStatus } from 'contensis-core-api';
import { Query } from 'contensis-delivery-api';
import { fieldExpression, defaultExpressions } from './expressions';

export const routeEntryByFieldsQuery = (
  id: string,
  language = 'en-GB',
  contentTypeId = '',
  fields: string[] = [],
  fieldLinkDepths: FieldLinkDepths,
  versionStatus: VersionStatus = 'published'
) => {
  const query = new Query(
    ...[
      ...fieldExpression('sys.id', id),
      ...fieldExpression('sys.language', language),
      ...(contentTypeId
        ? fieldExpression('sys.contentTypeId', contentTypeId)
        : fieldExpression('sys.dataFormat', 'entry')),
      ...defaultExpressions(versionStatus),
    ]
  );
  query.fields = fields;
  query.fieldLinkDepths = fieldLinkDepths;
  return query;
};
