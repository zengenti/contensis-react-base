export function action(type, payload = {}) {
  return { type, ...payload };
}

export const findContentTypeMapping = (ContentTypeMappings, contentTypeId) =>
  ContentTypeMappings.find(ct => ct.contentTypeID === contentTypeId);
