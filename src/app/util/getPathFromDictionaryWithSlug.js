export default function getPathFromDictionaryWithSlug(pathDictionary, slug) {
  return pathDictionary && pathDictionary[slug] && pathDictionary[slug].path;
}
