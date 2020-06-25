import mapJson, { jpath } from 'jsonpath-mapper';
export { default as mapJson, jpath } from 'jsonpath-mapper';

/**
 *
 * @param {object} json The source object we wish to transform
 * @param {object} template The mapping template we wish to apply to the source
 * object to generate the intended target object
 */
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
 * useEntriesMapper hook to take a list of entries from Delivery API along
 * with mappers for each contentTypeId and return an array of mapped objects
 * @param {any} entry The source entry we wish to transform
 * @param {object} mappers Object with keys containing mapper templates,
 * the key name matching sys.contentTypeId
 * @param {string} field Only include if we need to match content based on
 * a field other than sys.contentTypeId in the source data
 * @returns {object} Object transformed using a matched content type or
 * a default mapper template, returns an empty object if no mapper template
 * couild be applied.
 */
export const useEntriesMapper = (
  entry,
  mappers,
  field = 'sys.contentTypeId'
) => {
  const mapper = chooseMapperByFieldValue(entry, mappers, field);
  return useMapper(entry || {}, mapper);
};

/**
 * Deprecated: due to misleading name, use the hook useEntriesMapper instead
 */
export const useEntryMapper = useEntriesMapper;

/**
 * mapEntries mapping function to take a list of entries from Delivery API along
 * with mappers for each contentTypeId and return an array of mapped objects
 * @param {any} entry The source entry we wish to transform
 * @param {object} mappers Object with keys containing mapper templates,
 * the key name matching sys.contentTypeId
 * @param {string} field Only include if we need to match content based on
 * a field other than sys.contentTypeId in the source data
 * @returns {object} Object transformed using a matched content type or
 * a default mapper template, returns an empty object if no mapper template
 * couild be applied.
 */
export const mapEntries = (entries, mappers, field = 'sys.contentTypeId') =>
  entries.map(entry => {
    const mapper = chooseMapperByFieldValue(entry, mappers, field);
    return mapper ? mapJson(entry || {}, mapper) : entry;
  });

/**
 * mapComposer mapping function to take a composer field from Delivery API along
 * with mappers for each Composer Item "type" and return an array of mapped components
 * @param {array} composer Composer field array of Composer Items
 * @param {object} mappers A keyed object with each key matching the Composer Item "type"
 * @returns {array} Array of mapped objects transformed using a matched Composer Item "type" mapping
 * or null. Injects a "_type" property into each transformed object in the array to indicate
 * where the mapping originated and for what component the mapped object is representing
 */
export const mapComposer = (composer, mappers) =>
  Array.isArray(composer)
    ? composer.map(composerItem => {
        const fieldValue = composerItem.type;
        const mapper = mappers[fieldValue] || mappers['default'];
        return mapper
          ? { _type: fieldValue, ...mapJson(composerItem.value || {}, mapper) }
          : composerItem;
      })
    : null;

/**
 * useComposerMapper hook to take a composer field from Delivery API along
 * with mappers for each Composer Item "type" and return an array of mapped components
 * @param {array} composer Composer field array of Composer Items
 * @param {object} mappers A keyed object with each key matching the Composer Item "type"
 * @returns {array} Array of mapped objects transformed using a matched Composer Item "type" mapping
 * or null. Injects a "_type" property into each transformed object in the array to indicate
 * where the mapping originated and for what component the mapped object is representing
 */
export const useComposerMapper = (composer = [], mappers = {}) =>
  mapComposer(composer, mappers);

export default mapJson;
