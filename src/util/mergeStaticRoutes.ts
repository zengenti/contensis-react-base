import { StaticRoute } from '../';

export const mergeStaticRoutes = matchedStaticRoute => {
  let finalRoute: StaticRoute = {};
  for (const [i, route] of matchedStaticRoute.entries()) {
    const staticRouteCopy = { ...route.route };
    if (i === matchedStaticRoute.length - 1) {
      finalRoute = {
        ...finalRoute,
        ...staticRouteCopy,
        fullPath: `${finalRoute.fullPath || ''}${
          route.route.path ? route.route.path : ''
        }`,
      };
      matchedStaticRoute[i].route = finalRoute;
    } else {
      delete staticRouteCopy.children;
      delete staticRouteCopy.index;
      delete staticRouteCopy.path;
      delete staticRouteCopy.component;
      delete staticRouteCopy.element;
      finalRoute = {
        ...finalRoute,
        ...staticRouteCopy,
        fullPath: `${finalRoute.fullPath || ''}${
          route.route.path
            ? route.route.path.endsWith('/')
              ? route.route.path
              : route.route.path + '/'
            : ''
        }`,
      };
    }
  }
};
