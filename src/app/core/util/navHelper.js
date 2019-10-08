import { getContentPageEntriesQuery } from './queries';
import { deliveryApi } from '~/core/util/ContensisDeliveryApi';

// import { deliveryApi } from '~/core/util/ContensisDeliveryApi';

const getNormalisedLocation = location => {
  return `${location.pathname}${location.search}`;
};

const getHasParameterInQueryString = (urlPropsQueryConfig, nextprops) => {
  let hasParam = false;
  Object.keys(urlPropsQueryConfig).forEach(key => {
    const urlprops = urlPropsQueryConfig[key];
    if (nextprops[urlprops.queryParam]) {
      hasParam = true;
    }
  });
  return hasParam;
};

export const componentWillMountNavHandler = (props, urlPropsQueryConfig) => {
  // debugger;
  Object.keys(urlPropsQueryConfig).forEach(key => {
    const urlprops = urlPropsQueryConfig[key];
    if (
      props[urlprops.queryParam] &&
      props[urlprops.queryParam] != props[urlprops.reduxProp]
    ) {
      // debugger;
      eval(`props.${urlprops.reduxSetProp}`)(props[urlprops.queryParam]);
    }
  });

  // if (props.q && props.q != props.reduxKeyword) {
  //   // debugger;
  //   this.props.setSearchTerm(this.props.q);
  // }
};

export const componentWillReceivePropsNavHandler = (
  nextProps,
  component,
  urlPropsQueryConfig,
  currentPath
) => {
  const { previousLocation } = component.state;
  const normalisedLocation = getNormalisedLocation(nextProps.location);
  const navigated = normalisedLocation !== previousLocation;

  const hasParameterInQueryStringToInspect = getHasParameterInQueryString(
    urlPropsQueryConfig,
    nextProps
  );

  if (navigated && hasParameterInQueryStringToInspect) {
    // save the location so we can render the old screen
    Object.keys(urlPropsQueryConfig).forEach(key => {
      // debugger;
      const urlprops = urlPropsQueryConfig[key];
      if (nextProps[urlprops.queryParam]) {
        if (nextProps[urlprops.queryParam] != nextProps[urlprops.reduxProp]) {
          // debugger;
          eval(`component.props.${urlprops.reduxSetProp}`)(
            nextProps[urlprops.queryParam]
          );
        }
      }
      component.setState({
        previousLocation: getNormalisedLocation(nextProps.location),
      });
    });
  } else {
    // Handle Changes in Redux state
    let shouldClientNavigate = false;
    // debugger;
    Object.keys(urlPropsQueryConfig).forEach(key => {
      const urlprops = urlPropsQueryConfig[key];
      const nextQueryParam = nextProps[urlprops.queryParam];
      // Handle situation where you want querystring to inform redux, but no the other way round.
      if (typeof urlprops.reduxProp !== 'undefined') {
        const nextReduxParamVal = nextProps[urlprops.reduxProp];
        if (nextQueryParam !== nextReduxParamVal) {
          if (
            nextReduxParamVal !== null &&
            typeof nextReduxParamVal != 'undefined'
          ) {
            shouldClientNavigate = true;
          }
        }
      }
    });
    if (shouldClientNavigate) {
      let querystring = null;
      Object.keys(urlPropsQueryConfig).forEach(key => {
        const urlprops = urlPropsQueryConfig[key];
        if (urlprops.reduxProp) {
          if (querystring == null) {
            querystring = '?';
          } else {
            querystring += '&';
          }
          querystring += `${urlprops.queryParam}=${
            nextProps[urlprops.reduxProp]
          }`;
        }
      });
      component.props.history.push(`${currentPath}${querystring}`);
      component.setState({
        previousLocation: `${currentPath}${querystring}}`,
      });
    }
  }
};

const getTreeEntry = tree => {
  return tree && tree.entries && tree.entries.length > 0
    ? tree.entries[0]
    : null;
};

export const getHeaderMenu = tree => {
  const entry = getTreeEntry(tree);
  return entry && entry.menu ? entry.menu : [];
};

export const getFooterMenu = tree => {
  const entry = getTreeEntry(tree);
  return entry && entry.footerMenu ? entry.footerMenu : [];
};

export const getUrlFromNavigationSettings = entry => {
  let path = '';
  if (entry.navigationSettings && entry.navigationSettings.parent) {
    path += getUrlFromNavigationSettings(entry.navigationSettings.parent);
  } else {
    return '';
  }
  return `${path}/${entry.sys.slug}`;
};

export const getParentUrlFromNavigationSettings = entry => {
  return getUrlFromNavigationSettings(
    entry && entry.navigationSettings && entry.navigationSettings.parent
  );
};

export const getLeafSlugFromRoute = currentPath => {
  let pathParts = currentPath.split('/');
  return pathParts[pathParts.length - 1];
};

export const validateRouteFromNavigationSettings = (currentPath, entry) => {
  if (!entry) {
    return false;
  }
  let pathParts = currentPath
    .split('/')
    .reverse()
    .filter(p => p != '');
  let nextParent = entry;
  let routeValidationResult = true;
  pathParts.forEach(part => {
    if (
      nextParent &&
      nextParent.sys &&
      nextParent.sys.slug &&
      nextParent.sys.slug.toLowerCase() !== part.toLowerCase()
    ) {
      routeValidationResult = false;
    }
    nextParent =
      nextParent.navigationSettings && nextParent.navigationSettings.parent;
  });
  return routeValidationResult;
};

export const getPathDictionary = async (versionStatus, project) => {
  const pageSize = 3000;
  const query = getContentPageEntriesQuery(0, pageSize, versionStatus);
  const entryInfo = await getContentPageEntryInfo(query, project);
  // console.log('EntryInfo: ' + JSON.stringify(entryInfo));
  const { pageCount } = entryInfo;
  const pageArray = [];
  for (let i = 0; i < pageCount; i += 1) {
    pageArray.push(i);
  }
  const getEntryTasks = [];
  pageArray.forEach(pageIndex => {
    query.pageIndex = pageIndex;
    getEntryTasks.push(getContentPageEntries(query, project));
  });
  const pagesOfEntries = await Promise.all(getEntryTasks);
  const writeTasks = [];
  const dictionary = {};
  pagesOfEntries.forEach(entryPage => {
    writeTasks.push(writePageOfEntries(entryPage, dictionary));
  });
  await Promise.all(writeTasks);
  return dictionary;
};

const writePageOfEntries = async function(entries, dictionary) {
  return new Promise(function(resolve, reject) {
    try {
      if (entries && entries.length) {
        // console.log(`writing page of entries...`);
        entries.forEach(entry => {
          const slug = entry.sys.slug;
          const path = getPathFromEntry(entry);
          const encodedPath = encodeURI(path);
          const id = entry.sys.id;
          const title = entry.entryTitle;
          const contentTypeId = entry.sys.contentTypeId;
          dictionary[slug] = { path: encodedPath, title, id, contentTypeId };
        });
      }
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

const getContentPageEntryInfo = async (query, project) => {
  try {
    const result = await deliveryApi.search(query, 3, project);
    return result;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

const getContentPageEntries = async (query, project) => {
  try {
    const payload = await deliveryApi.search(query, 3, project);
    if (payload && payload.items) {
      return payload.items;
    }
    return [];
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

export const getPathFromEntry = entry => {
  let path =
    entry.sys.contentTypeId === 'externalLink' && entry.url
      ? entry.url
      : entry.navigationSettings && entry.navigationSettings.parent
      ? `/${entry.navigationSettings.parent.sys.slug}/${entry.sys.slug}`
      : `/${entry.sys.slug}`;
  return path;
};
