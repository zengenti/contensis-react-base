import { Op, Query } from 'contensis-delivery-api';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { actions, UpdateLanguageActionPayload } from './slice';

import type { Action, PayloadAction } from '@reduxjs/toolkit';
import type { PagedSearchList, Project } from 'contensis-core-api';
import type { Entry, Node } from 'contensis-delivery-api';
import { setRoute } from '~/routing/redux/actions';
import {
  selectCurrentPath,
  selectRouteEntryAvailableLanguages,
  selectRouteEntryID,
  selectRouteEntryLanguage,
  selectStaticRoute,
} from '~/routing/redux/selectors';
import { selectVersionStatus } from '~/redux/selectors/version';
import { I18nAppConfig } from '~/models/config/I18n';
import { cachedSearch } from '~/util';
import {
  selectCurrentLanguage,
  selectDictionary,
  selectDictionaryResolver,
  selectLocaleRoutes,
  selectLocales,
  selectPrimaryLanguage,
} from './selectors';
import { LocaleRoutes, Locales } from '~/models/Locales';
import { SET_ENTRY } from '~/routing/redux/types';
import { deparameterise } from '../routes';

export const i18nSagas = [
  takeEvery<PayloadAction<I18nAppConfig>>(
    actions.INIT_LOCALES.type,
    getProjectLanguages
  ),
  takeEvery<
    Action<typeof SET_ENTRY> & {
      entry: Entry | null;
      node: Node | null;
    }
  >(SET_ENTRY, resolveCurrentRouteLanguage),
  takeEvery<PayloadAction<UpdateLanguageActionPayload>>(
    actions.UPDATE_LANGUAGE.type,
    updateLanguage
  ),
];

function* resolveCurrentRouteLanguage({
  entry,
  node,
}: Action<typeof SET_ENTRY> & {
  entry: Entry | null;
  node: Node | null;
}) {
  const currentLanguage = yield select(selectCurrentLanguage);
  const staticRoute = yield select(selectStaticRoute);
  let nextLanguage = currentLanguage;
  if (entry?.sys?.language) nextLanguage = entry.sys.language;
  else if (node?.language) nextLanguage = node.language;
  else if (staticRoute?.route?.language)
    nextLanguage = staticRoute.route.language;
  else nextLanguage = yield select(selectPrimaryLanguage);

  if (nextLanguage && nextLanguage !== currentLanguage) {
    const dictionary = yield call(resolveDictionaryForLanguage, nextLanguage);
    yield put(
      actions.SET_LANGUAGE({
        language: nextLanguage,
        dictionary,
      })
    );
  }
}

function* resolveDictionaryForLanguage(language: string) {
  let dictionary = yield select(selectDictionary);
  // try and resolve a dictionary for this language
  const resolver = yield select(selectDictionaryResolver);
  if (typeof resolver === 'function') {
    try {
      // dynamic import of dictionary file
      const loadedDictionary = yield call(resolver, language);
      dictionary = loadedDictionary;
    } catch (error) {
      console.error(`No dictionary resolved for language ${language}`, error);
    }
  } else {
    // Load dictionary from locales in state
    const locales: Locales = yield select(selectLocales);
    if (locales && locales[language]) {
      dictionary = locales[language];
    }
  }
  return dictionary;
}

function* updateLanguage({
  payload: { language, redirect, fallbackPath },
}: PayloadAction<UpdateLanguageActionPayload>) {
  const currentLanguage: string = yield select(selectCurrentLanguage);
  if (language === currentLanguage) {
    // no change needed
    return;
  } else {
    const dictionary =
      language !== currentLanguage
        ? yield call(resolveDictionaryForLanguage, language)
        : yield select(selectDictionary);

    const uri = yield call(navigateToLanguageRoute, {
      language,
      redirect,
      fallbackPath,
    });
    const currentPath = yield select(selectCurrentPath);
    if (uri === currentPath || redirect === false) {
      // already on the correct path, no need to redirect
      if (dictionary)
        yield put(
          actions.SET_LANGUAGE({
            language,
            dictionary,
          })
        );
      return;
    }
    yield put(setRoute(uri));
  }
}

function* navigateToLanguageRoute({
  language,
  redirect,
  fallbackPath,
}: UpdateLanguageActionPayload) {
  // have they supplied the route to go to?
  if (typeof redirect === 'string') {
    return redirect;
  }

  // is this an entry or a static route?
  const availableLanguages: string[] = yield select(
    selectRouteEntryAvailableLanguages
  );

  if (
    availableLanguages.find(l => l.toLowerCase() === language.toLowerCase())
  ) {
    // if entry, get the uri for this language variation from the api
    const entryUri: string | null = yield call(getEntryUriForLanguage, {
      entryId: yield select(selectRouteEntryID),
      language,
    });
    if (entryUri) {
      return entryUri;
    }
  }

  // if static route, get the uri from the routes config
  const staticRouteUri: string | null = yield call(getStaticRouteUri, {
    language,
  });
  if (staticRouteUri) {
    return staticRouteUri;
  }

  // if all else fails, fallback to the supplied fallback path or homepage
  return fallbackPath || `/${language.toLowerCase()}`;
}

/** Check any current static route for a language variation we have stored in i18n.routes */
function* getStaticRouteUri({ language }: { language: string }) {
  const staticRoute = yield select(selectStaticRoute);
  if (staticRoute?.route.path) {
    // Routes can have parameters such as `/:facet?` we need to deparameterise
    // so we can check against our stored locale routes
    const deparameterisedPath = deparameterise(staticRoute.route.path);
    const localeRoutes: LocaleRoutes = yield select(selectLocaleRoutes);
    const originalPath = Object.entries(localeRoutes || {}).find(
      ([, locales]) => Object.values(locales).includes(deparameterisedPath)
    )?.[0];
    const routeLocales =
      localeRoutes[deparameterisedPath] || localeRoutes[originalPath || ''];
    const routeUri: string = routeLocales?.[language];
    return routeUri;
  }
}

function* getProjectLanguages({ payload }: PayloadAction<I18nAppConfig>) {
  const stateLocales = yield select(selectLocales);
  if (stateLocales && Object.keys(stateLocales).length > 0)
    // Locales already set in state, no need to fetch again
    return;
  const locales: Locales = {};
  const supportedLanguages: string[] = payload.supportedLanguages || [];
  if (supportedLanguages?.length) {
    // If supported languages are provided in config, use these
    for (const supportedLanguage of supportedLanguages) {
      locales[supportedLanguage] = {};
    }
  } else {
    // Fallback to getting languages from the project
    const project: Project = yield cachedSearch.getClient().project.get();

    for (const supportedLanguage of project.supportedLanguages) {
      locales[supportedLanguage] = {};
      supportedLanguages.push(supportedLanguage);
    }
  }
  if (Object.keys(locales).length === 0) {
    // Ensure at least the primary language is included
    locales[payload.primaryLanguage] = {};
    supportedLanguages.push(payload.primaryLanguage);
  }

  // Only commit if we have locales to set or we will end up in an infinite loop
  if (Object.keys(locales).length)
    yield put(
      actions.SET_LOCALES({
        ...payload,
        locales,
      })
    );
}

/** Run a Delivery API query to get all language variations for this entryId */
function* getEntryUriForLanguage({
  entryId,
  language,
}: {
  entryId: string;
  language: string;
}) {
  try {
    const versionStatus: string = yield select(selectVersionStatus);
    const query = new Query(
      Op.equalTo('sys.id', entryId),
      Op.equalTo('sys.language', language),
      Op.equalTo('sys.versionStatus', versionStatus)
    );
    query.fields = ['sys.uri'];
    query.pageSize = 1;

    const result: PagedSearchList<Entry> = yield cachedSearch.search(query);

    return result.items.length ? result.items[0].sys.uri : null;
  } catch (error) {
    console.error('Error fetching language variations:', error);
    yield put(actions.GET_ENTRY_URI_ERROR(error as Error));
  }
}
