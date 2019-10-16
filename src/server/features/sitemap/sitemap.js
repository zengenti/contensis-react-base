import { Op, Query } from 'contensis-delivery-api';
import { createSitemap } from 'sitemap';
import { cachedSearch } from '~/core/util/ContensisDeliveryApi';
import { getUrlFromNavigationSettings } from '~/core/util/navHelper';
import { dynamicSort } from '~/core/util/helpers';

/* global PUBLIC_URI */
const publicUri = PUBLIC_URI;

/* global DELIVERY_API_CONFIG */
const contensisConfig = {
  rootUrl: DELIVERY_API_CONFIG.rootUrl,
  accessToken: DELIVERY_API_CONFIG.accessToken,
  projectId: DELIVERY_API_CONFIG.projectId,
  contentTypes: [
    'homepage',
    'content',
    'listing',
    'metadataBlogArticle',
    'metadataEvent',
    'metadataNewsArticle',
  ],
  fields: [
    'authentication',
    'navigationSettings',
    'sys.contentTypeId',
    'sys.uri',
    'sys.slug',
    'sys.metadata',
  ],
  previewUrl: publicUri,
};

const query = (pageIndex, pageSize) => {
  const { contentTypes, fields } = contensisConfig;
  const query = new Query(
    Op.equalTo('sys.versionStatus', 'published'),
    Op.or(
      Op.in('sys.contentTypeId', ...contentTypes),
      Op.and(
        Op.equalTo('sys.dataFormat', 'webpage'),
        Op.equalTo('sys.metadata.includeInSearch', true)
      )
    ),
    Op.or(
      Op.exists('navigationSettings.includeInSearch', false),
      Op.equalTo('navigationSettings.includeInSearch', true)
    ),
    Op.or(
      Op.exists('publishDate', false),
      Op.lessThanOrEqualTo('publishDate', new Date())
    )
  );

  if (fields && fields.length > 0) {
    //query.fields = [...fields];
  }

  query.pageSize = pageSize;
  query.pageIndex = pageIndex;
  return query;
};

const getEntries = async (pageIndex, pageSize, project) => {
  try {
    return await cachedSearch.search(
      query(pageIndex, pageSize),
      6,
      project || contensisConfig.projectId
    );
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

const mapEntryToSitemapUrl = entry => {
  let url;

  const { dataFormat, contentTypeId, metadata, uri } = entry.sys;
  if (dataFormat == 'webpage') {
    url = uri;
  } else if (contentTypeId == 'homepage') {
    url = '/';
  } else if (metadata && metadata['canonical-url']) {
    const canonical = metadata['canonical-url'];
    const slug = metadata['origin-slug'];
    url = slug ? `${canonical}/${slug}` : canonical;
  } else if (entry.navigationSettings) {
    url = getUrlFromNavigationSettings(entry);
  } else {
    url = uri;
  }

  return { url: encodeURI(url) };
};

const generateSitemap = async project =>
  //eslint-disable-next-line
  new Promise(async (resolve, reject) => {
    try {
      const pageSize = 100;
      const entryInfo = await getEntries(0, pageSize, project);

      const getEntryPages = [];
      for (let pageIndex = 1; pageIndex < entryInfo.pageCount; pageIndex++) {
        getEntryPages.push(getEntries(pageIndex, pageSize, project));
      }

      const entryPages = await Promise.all(getEntryPages);
      const entriesList = [
        ...entryInfo.items,
        ...[].concat.apply([], entryPages.map(pg => pg.items)),
      ];

      const mappedUrls = entriesList
        .map(e => mapEntryToSitemapUrl(e))
        .sort(dynamicSort('url'));

      const sitemap = createSitemap({
        hostname: `https://${publicUri}`,
        cacheTime: 600000,
        urls: mappedUrls,
      });

      resolve(sitemap);
    } catch (error) {
      reject(error);
    }
  });

export default generateSitemap;
