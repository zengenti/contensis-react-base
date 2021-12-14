import { Entry } from 'contensis-delivery-api/lib/models';
import mapJson, { jpath } from 'jsonpath-mapper';
import MappingTemplate, {
  PureJsFunction,
} from 'jsonpath-mapper/dist/models/Template';
import { AppState } from '~/redux/appstate';
import { EntryMapper, RouteNode } from '~/routing/routes';

export { default as mapJson, jpath } from 'jsonpath-mapper';

type Mappers<S> = { [contentTypeId: string]: MappingTemplate<S> };

/**
 *
 * @param {object} json The source object we wish to transform
 * @param {object} template The mapping template we wish to apply to the source
 * object to generate the intended target object
 */
export const useMapper = <T, S>(json: S, template: MappingTemplate<S>) => {
  return template ? (mapJson((json || {}) as S, template) as T) : json;
};

const chooseMapperByFieldValue = <S, T extends Mappers<S>>(
  entry: S,
  mappers: T,
  field = 'sys.contentTypeId'
) => {
  const fieldValue = jpath(field, entry || {}) as string;
  return (mappers[fieldValue] || mappers.default || {}) as T[keyof T];
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
export const useEntriesMapper = <S, T extends Mappers<S>>(
  entry: S,
  mappers: T,
  field = 'sys.contentTypeId'
) => {
  const mapper = chooseMapperByFieldValue(entry, mappers, field);
  return useMapper(entry, mapper);
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
export const mapEntries = <
  S,
  Mappers extends { [contentTypeId: string]: MappingTemplate<S> }
>(
  entries: S[],
  mappers: Mappers,
  field = 'sys.contentTypeId'
) =>
  entries.map(entry => {
    const mapper = chooseMapperByFieldValue(entry, mappers, field);
    return mapper ? mapJson((entry || {}) as S, mapper) : entry;
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
export const mapComposer = <
  S extends { type: string; value: any },
  T extends Mappers<S>
>(
  composer: S[],
  mappers: T
) =>
  Array.isArray(composer)
    ? composer.map((composerItem, index) => {
        const itemValue = composerItem.value;
        const mapper = mappers[composerItem.type] || mappers.default;
        if (mapper) {
          // Add some fields into the composer item mapper and return object
          const addedFields = {
            _type: composerItem.type,
            _index: index,
          };

          // Add fields and $root item into the composer item source object
          // for use inside each item mapping, for arrays we inject the added fields
          // into the first array item. This is useful if we require any of
          // composerItem.type, composerItem index/position and composer $root
          // in scope to influence any composer item's mapping logic
          const sourceObject =
            itemValue && Array.isArray(itemValue)
              ? itemValue.map((iv, idx) =>
                  idx !== 0
                    ? iv
                    : typeof iv === 'object'
                    ? { ...addedFields, ...iv, $root: composer }
                    : iv
                )
              : typeof itemValue === 'object'
              ? { ...addedFields, ...itemValue, $root: composer }
              : itemValue || {};

          // Apply the composer item mapping
          const mappedFields = mapJson(sourceObject, mapper) as any;

          // Add the extra fields in with the return object
          return mappedFields && typeof mappedFields === 'object'
            ? { ...mappedFields, ...addedFields }
            : mappedFields;
        } else return;
      })
    : composer || [];

/**
 * useComposerMapper hook to take a composer field from Delivery API along
 * with mappers for each Composer Item "type" and return an array of mapped components
 * @param {array} composer Composer field array of Composer Items
 * @param {object} mappers A keyed object with each key matching the Composer Item "type"
 * @returns {array} Array of mapped objects transformed using a matched Composer Item "type" mapping
 * or null. Injects a "_type" property into each transformed object in the array to indicate
 * where the mapping originated and for what component the mapped object is representing
 */
export const useComposerMapper = <
  S extends { type: string; value: any },
  T extends Mappers<S>
>(
  composer: S[] = [],
  mappers: T
) => mapComposer(composer, mappers);

/**
 * entryMapper will return a function to satisfy an entryMapper when defining app route
 * this is essentially a shorthand function to prevent boilerplate repetition inside your routes file
 * you do not need to use this function should you wish to map your entry via raw JS functions
 * @param mapping the jsonpath-mapper mapping template to apply when the route is resolved
 * @returns {mappedEntry}
 */
export const entryMapper =
  (
    mapping:
      | MappingTemplate<RouteNode & Entry & { state?: AppState }>
      | PureJsFunction<RouteNode & Entry & { state?: AppState }>
  ): EntryMapper =>
  (node, state) =>
    mapJson({ ...node, ...(node.entry || ({} as Entry)), state }, mapping);

export default mapJson;
