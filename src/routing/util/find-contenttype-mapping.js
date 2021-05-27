export const findContentTypeMapping = (ContentTypeMappings, contentTypeId) =>
  ContentTypeMappings.find(ct => ct.contentTypeID === contentTypeId);
