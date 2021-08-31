import mapJson from 'jsonpath-mapper';
import MappingTemplate from 'jsonpath-mapper/dist/models/Template';
export { default as mapJson, jpath } from 'jsonpath-mapper';
declare type Mappers<S> = {
    [contentTypeId: string]: MappingTemplate<S>;
};
/**
 *
 * @param {object} json The source object we wish to transform
 * @param {object} template The mapping template we wish to apply to the source
 * object to generate the intended target object
 */
export declare const useMapper: <T, S>(json: S, template: MappingTemplate<S>) => T | S;
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
export declare const useEntriesMapper: <S, T extends Mappers<S>>(entry: S, mappers: T, field?: string) => unknown;
/**
 * Deprecated: due to misleading name, use the hook useEntriesMapper instead
 */
export declare const useEntryMapper: <S, T extends Mappers<S>>(entry: S, mappers: T, field?: string) => unknown;
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
export declare const mapEntries: <S, Mappers_1 extends {
    [contentTypeId: string]: MappingTemplate<S>;
}>(entries: S[], mappers: Mappers_1, field?: string) => unknown[];
/**
 * mapComposer mapping function to take a composer field from Delivery API along
 * with mappers for each Composer Item "type" and return an array of mapped components
 * @param {array} composer Composer field array of Composer Items
 * @param {object} mappers A keyed object with each key matching the Composer Item "type"
 * @returns {array} Array of mapped objects transformed using a matched Composer Item "type" mapping
 * or null. Injects a "_type" property into each transformed object in the array to indicate
 * where the mapping originated and for what component the mapped object is representing
 */
export declare const mapComposer: <S extends {
    type: string;
    value: any;
}, T extends Mappers<S>>(composer: S[], mappers: T) => any[];
/**
 * useComposerMapper hook to take a composer field from Delivery API along
 * with mappers for each Composer Item "type" and return an array of mapped components
 * @param {array} composer Composer field array of Composer Items
 * @param {object} mappers A keyed object with each key matching the Composer Item "type"
 * @returns {array} Array of mapped objects transformed using a matched Composer Item "type" mapping
 * or null. Injects a "_type" property into each transformed object in the array to indicate
 * where the mapping originated and for what component the mapped object is representing
 */
export declare const useComposerMapper: <S extends {
    type: string;
    value: any;
}, T extends Mappers<S>>(composer: S[] | undefined, mappers: T) => any[];
export default mapJson;
