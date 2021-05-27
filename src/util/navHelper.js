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
  Object.keys(urlPropsQueryConfig).forEach(key => {
    const urlprops = urlPropsQueryConfig[key];
    if (
      props[urlprops.queryParam] &&
      props[urlprops.queryParam] != props[urlprops.reduxProp]
    ) {
      eval(`props.${urlprops.reduxSetProp}`)(props[urlprops.queryParam]);
    }
  });
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

export const getPathFromEntry = entry => {
  let path =
    entry.sys.contentTypeId === 'externalLink' && entry.url
      ? entry.url
      : entry.navigationSettings && entry.navigationSettings.parent
      ? `/${entry.navigationSettings.parent.sys.slug}/${entry.sys.slug}`
      : `/${entry.sys.slug}`;
  return path;
};
