// generates and returns a site-map, also updates the sitemap in dist/static/sitemap.xml
// possibly recommend robots.txt has link to dist/static/sitemap.xml
// and another process routinely calls this endpoint to refresh sitemap?
// alternatively link straight to this endpoint, currently about 3 seconds

// <?xml version="1.0" encoding="UTF-8"?>
// <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//   <url>
//     <loc>http://www.example.com/foo.html</loc>
//     <lastmod>2018-06-04</lastmod>
//   </url>
// </urlset>

// https://support.google.com/webmasters/answer/183668?hl=en

// enable by removing single slash for debugging...
///* eslint-disable no-unused-vars */
///* eslint-disable no-console */

//TODO - get this config from webpack config
const DeliveryApi = require('contensis-delivery-api');
const fs = require('fs');
const XMLWriter = require('xml-writer');
/* global DELIVERY_API_CONFIG PUBLIC_URI */
const contensisConfig = {
  rootUrl: DELIVERY_API_CONFIG.rootUrl,
  accessToken: DELIVERY_API_CONFIG.accessToken,
  projectId: DELIVERY_API_CONFIG.projectId,
  contentTypes: ['content', 'article', 'listing', 'standard', 'opportunity'],
  previewUrl: PUBLIC_URI,
  outputDir: 'dist/static',
  siteMapName: 'sitemap.xml',
};

const { Op, Query } = DeliveryApi;

const client = DeliveryApi.Client.create(contensisConfig);
const search = (query, linkDepth) =>
  client.entries.search(query, linkDepth || 1);
const getEntry = entryID => client.entries.get(entryID, {});

const getEntryById = async entryId => {
  try {
    const entry = await getEntry(entryId);
    return entry;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};
const getParentEntry = async entry => {
  const parentId =
    entry &&
    entry.navigationSettings &&
    entry.navigationSettings.parent &&
    entry.navigationSettings.parent.sys &&
    entry.navigationSettings.parent.sys.id;
  if (parentId) {
    const parentEntry = await getEntryById(parentId);
    return parentEntry;
  }
  return null;
};
const getPathFromEntry = async sourceEntry => {
  const path = [];
  let checkForParent = true;
  let entry = sourceEntry;
  while (checkForParent) {
    const id = entry && entry.sys && entry.sys.id;
    const slug = entry && entry.sys && entry.sys.slug;
    const title = entry.entryTitle || '';
    const lastMod =
      (entry &&
        entry.sys &&
        entry.sys.version &&
        entry.sys.version.published) ||
      (entry &&
        entry.sys &&
        entry.sys.version &&
        entry.sys.version.lastUpdated) ||
      null;
    if (slug && id) {
      path.splice(0, 0, {
        slug,
        id,
        title,
        lastMod,
      });
      const parentEntry = await getParentEntry(entry); // eslint-disable-line no-await-in-loop
      if (parentEntry) {
        entry = parentEntry;
      } else {
        checkForParent = false;
      }
    } else {
      checkForParent = false;
    }
  }
  return path;
};

const getContentPageEntries = async query => {
  try {
    const payload = await search(query, 2);
    if (payload && payload.items) {
      return payload.items;
    }
    return [];
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

const getContentPageEntriesQuery = (pageIndex, pageSize) => {
  const { contentTypes } = contensisConfig;
  const query = new Query(
    Op.equalTo('sys.versionStatus', 'published'),
    Op.in('sys.contentTypeId', ...contentTypes)
  );
  query.pageSize = pageSize;
  query.fields = [
    'entryTitle',
    'navigationSettings',
    'sys.slug',
    'sys.contentTypeId',
    'sys.version',
  ];
  query.pageIndex = pageIndex;
  return query;
};

const writePageOfEntries = async (entries, xw) => {
  //eslint-disable-next-line
  return new Promise(async (resolve, reject) => {
    try {
      if (entries && entries.length) {
        // console.log(`writing page of entries...`);
        const pathTasks = entries.map(getPathFromEntry);
        const paths = await Promise.all(pathTasks);
        paths.forEach(path => {
          let pathAsString = path
            .map(node => node.slug)
            .join('/')
            .replace(/^\/+/, '');
          // remove 'home' from the start of any paths
          // as I think this was used to by content types to live under the home page
          const regExpPattern = /^home\/{1}([\w\-/\?=&]+)/; // eslint-disable-line
          const homeMatch = regExpPattern.exec(pathAsString);
          if (homeMatch && homeMatch.length > 1) {
            pathAsString = homeMatch[1]; // eslint-disable-line prefer-destructuring
          }
          // paths in sitemap must be encoded
          const encodedPathWithHost = encodeURI(
            `${contensisConfig.previewUrl}/${pathAsString}`
          );
          const leaf = path[path.length - 1];
          const lastmod =
            (leaf.lastMod &&
              leaf.lastMod.length &&
              leaf.lastMod.slice(0, 10)) ||
            '2019-03-13';
          // console.log(encodedPathWithHost);
          xw.startElement('url');
          xw.startElement('loc');
          xw.text(encodedPathWithHost);
          xw.endElement('loc');
          xw.startElement('lastmod');
          xw.text(lastmod);
          xw.endElement('lastmod');
          xw.endElement('url');
        });
      }
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

const getContentPageEntryInfo = async pageSize => {
  try {
    const query = getContentPageEntriesQuery(0, pageSize);
    const result = await search(query, 2);
    // console.log(`pages: ${result.pageCount}`);
    return result;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};
// [TODO] dynamic contentTypeId query?
const generateSiteMap = async response =>
  //eslint-disable-next-line
  new Promise(async (resolve, reject) => {
    try {
      // console.log('starting site map gen...');
      const pageSize = 10;
      const entryInfo = await getContentPageEntryInfo(pageSize);
      const { pageCount } = entryInfo;
      const outputPath = `${contensisConfig.outputDir}/${contensisConfig.siteMapName}`;
      // console.log('create WriteStream to output path: ' + outputPath);
      const siteMapStream = fs.createWriteStream(outputPath);
      siteMapStream.on('close', () => {
        // console.log(fs.readFileSync(outputPath, 'UTF-8'));
        response.end();
      });
      const xw = new XMLWriter(true, (string, encoding) => {
        // console.log('writing stream to XMLWriter...');
        siteMapStream.write(string, encoding);
        response.write(string, encoding);
      });
      xw.startDocument('1.0', 'UTF-8');
      xw.startElement('urlset');
      xw.writeAttribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
      const pageArray = [];
      for (let i = 0; i < pageCount; i += 1) {
        pageArray.push(i);
      }
      const getEntryTasks = [];
      pageArray.forEach(pageIndex => {
        const query = getContentPageEntriesQuery(pageIndex, pageSize);
        getEntryTasks.push(getContentPageEntries(query));
      });
      const pagesOfEntries = await Promise.all(getEntryTasks);
      const writeTasks = [];
      pagesOfEntries.forEach(entryPage => {
        writeTasks.push(writePageOfEntries(entryPage, xw));
      });
      await Promise.all(writeTasks);
      xw.endElement('urlset');
      xw.endDocument();
      // console.log('writing file to siteMapStream');
      siteMapStream.write(xw.toString());
      siteMapStream.end();
      resolve();
    } catch (error) {
      reject(error);
    }
  });

export default generateSiteMap;
