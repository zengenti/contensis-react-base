import { mapImageComponent } from '../';
import ProjectHelper from '~/core/util/helpers';

const getImageFromEntry = entry => {
  const image =
    (entry.metaInformation && entry.metaInformation.metaImage) ||
    entry.heroImage;

  return mapImageComponent(image);
};

const bindCardProps = (card, rootUri, contentTypes, replaceResultsPath) => {
  const searchContentType = contentTypes.find(
    ct => ct.contentTypeId == card.sys.contentTypeId
  );

  let root = (searchContentType && searchContentType.url) || rootUri;
  let uri;

  // const replacePath = searchContentType && searchContentType.originalPath;
  uri = (card.url || card.sys.uri).toLowerCase();

  const replacePath =
    replaceResultsPath &&
    replaceResultsPath.find(repl => uri.includes(repl.replaceValue));

  if (root && !root.startsWith('http')) {
    uri = root;
    root = rootUri;
  }

  uri = uri.replace(
    (replacePath && replacePath.replaceValue) || '',
    (replacePath && replacePath.withValue) || ''
  );

  uri = uri
    .replace('{GUID}', card.sys.id)
    .replace('{SLUG}', card.pageName || card.sys.slug);

  let excerpt =
    card.entryDescription ||
    card.description ||
    card.excerpt ||
    (card.metaInformation && card.metaInformation.metaDescription);

  if (excerpt && excerpt.length > 255) {
    excerpt = `${excerpt.substr(0, 255)}...`;
  }

  let title = card.title ? card.title : card.entryTitle;
  title =
    card.sys.contentTypeId.toLowerCase() == 'searchmetadata' &&
    card.searchImportInformation &&
    card.searchImportInformation.sourceSystem &&
    card.searchImportInformation.sourceSystem.toLowerCase() ==
      'servicedirectory'
      ? `${title} | Hertfordshire Directory`
      : title;

  return {
    date: card.publishDate,
    excerpt,
    image: getImageFromEntry(card),
    linkPath:
      card.sys &&
      ProjectHelper.dedupeUriSlashes(
        (uri && uri.startsWith('http') && uri) ||
          (uri && !uri.startsWith('http') && `${root}/${uri}`)
      ),
    tag: card.storyClassification ? card.storyClassification.name : null,
    title,
  };
};

export default bindCardProps;

export const bindFeaturedCardProps = featuredResultsEntry => {
  const { value: entry } = featuredResultsEntry.searchResult.find(
    cf => cf.type == 'entry'
  ) || { value: null };
  const { value: override } = featuredResultsEntry.searchResult.find(
    cf => cf.type == 'resultOverride'
  ) || { value: null };

  if (!entry && !override) return null;
  return {
    date: entry ? entry.sys.published : featuredResultsEntry.sys.published,
    excerpt: entry
      ? override && override.description
        ? override.description
        : entry.entryDescription || entry.excerpt
      : override.description,
    image: entry
      ? override && override.thumbnailImage
        ? override.thumbnailImage
        : getImageFromEntry(entry)
      : override.thumbnailImage,
    linkPath: entry
      ? override && override.linkPath
        ? override.linkPath
        : entry.sys.slug
      : override.linkPath,
    tag: 'Featured',
    title: entry
      ? override && override.title
        ? override.title
        : entry.entryTitle
      : override.title,
    type: featuredResultsEntry.sys.contentTypeId,
    sys: entry && entry.sys,
  };
};
