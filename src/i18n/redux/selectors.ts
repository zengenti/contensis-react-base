import { AppState } from '~/models';
import { LocaleDictionary } from '~/models/Locales';

export const selectLocales = (state: AppState) => state.i18n.locales;

export const selectLocaleRoutes = (state: AppState) => state.i18n.routes;

export const selectCurrentLanguage = (state: AppState) =>
  state.i18n.currentLanguage;

export const selectPrimaryLanguage = (state: AppState) =>
  state.i18n.primaryLanguage;

export const selectSupportedLanguages = (state: AppState) =>
  state.i18n.supportedLanguages;

export const selectDictionary = <T extends LocaleDictionary = LocaleDictionary>(state: AppState) =>
  state.i18n.dictionary as T;

export const selectDictionaryResolver = (state: AppState) =>
  state.i18n.resolver;
