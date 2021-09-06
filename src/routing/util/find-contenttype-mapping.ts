import { ContentTypeMapping } from '../routes';

export const findContentTypeMapping = (
  ContentTypeMappings: ContentTypeMapping[],
  contentTypeId: string
) => ContentTypeMappings.find(ct => ct.contentTypeID === contentTypeId);
