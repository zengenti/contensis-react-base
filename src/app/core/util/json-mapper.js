import mapJson, { jpath } from 'jsonpath-mapper';
export {default as mapJson, jpath } from 'jsonpath-mapper';

export const useMapper = (json, template) => {
  return template ? mapJson(json, template) : ;
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
  const fieldValue = jpath(field, entry || {});
  const mapper = mappers[fieldValue] || mappers['default'];
  return useMapper(entry || {}, mapper);
};

export default mapJson;
