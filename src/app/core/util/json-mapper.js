import mapJson from 'jsonpath-mapper';

export const useMapper = (json, template) => {
  return mapJson(json, template);
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
export const useEntryMapper = (entry, mappers) => {
  const mapper =
    entry && entry.sys.contentTypeId
      ? mappers[entry.sys.contentTypeId]
      : mappers['default'];
  return useMapper(entry || {}, mapper);
};

export default mapJson;
