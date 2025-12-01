import type { AppRoutes } from '~/models';

export const deparameterise = (path: string) => {
  return path.replace(/\/:\w+\??/g, '');
};

/** Create static routes for routes with specified locales */
export const createLocaleRoutes = (routes: AppRoutes) => {
  const localeRoutes: {
    [originalPath: string]: { [locale: string]: string };
  } = {};
  for (const route of routes.StaticRoutes) {
    // If the route has defined locales, create entries for each locale
    if (route.i18n && route.path) {
      for (const [language, path] of Object.entries(route.i18n)) {
        // We already have a locale route, so just append the language and path
        const deparameterisedPath = deparameterise(route.path);
        const deparameterisedLocalePath = deparameterise(path);
        if (localeRoutes[deparameterisedPath])
          localeRoutes[deparameterisedPath][language] =
            deparameterisedLocalePath;
        // Otherwise, create a new entry for this route path
        else
          localeRoutes[deparameterisedPath] = {
            [language]: deparameterisedLocalePath,
          };
        if (deparameterise(route.path) !== deparameterisedLocalePath) {
          // I think we are OK to mutate here as this is only run once on app init
          // we can change this if needed later
          routes.StaticRoutes.push({
            ...route,
            path, // Add the path with any parameters included
            language,
            i18n: undefined,
          });
        } else {
          // Just set the language on the existing route instead of creating a duplicate
          route.language = language;
        }
      }
    }
  }
  return localeRoutes;
};
