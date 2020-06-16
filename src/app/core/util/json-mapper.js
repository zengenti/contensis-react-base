import mapJson, { jpath } from 'jsonpath-mapper';
export { default as mapJson, jpath } from 'jsonpath-mapper';

export const useMapper = (json, template) => {
  return template ? mapJson(json || {}, template) : json;
};

const chooseMapperByFieldValue = (
  entry,
  mappers,
  field = 'sys.contentTypeId'
) => {
  const fieldValue = jpath(field, entry || {});
  return mappers[fieldValue] || mappers['default'] || {};
};

/**
 * useEntryMapper hook
 * @param {any} entry The source entry we wish to transform
 * @param {object} mappers Object with keys containing mapper templates,
 * the key name matching entry.sys.contentTypeId
 * @returns {object} Object transformed using a matched content type or
 * a default mapper template, returns an empty object if no mapper template
 * couild be applied.
 */
export const useEntryMapper = (entry, mappers, field = 'sys.contentTypeId') => {
  const mapper = chooseMapperByFieldValue(entry, mappers, field);
  return useMapper(entry || {}, mapper);
};

export const mapEntries = (entries, mappers, field = 'sys.contentTypeId') =>
  entries.map(entry => {
    const mapper = chooseMapperByFieldValue(entry, mappers, field);
    return mapper ? mapJson(entry || {}, mapper) : entry;
  });

export default mapJson;
