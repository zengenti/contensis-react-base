import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { I18nAppConfig } from '~/models/config/I18n';
import { LocaleDictionary, LocaleRoutes, Locales } from '~/models/Locales';

export type UpdateLanguageActionPayload = {
  language: string;
  redirect?: boolean | string;
  fallbackPath?: string;
};

const i18nSlice = createSlice({
  name: 'i18n',
  initialState: {
    currentLanguage: '',
    dictionary: {} as LocaleDictionary,
    locales: {} as { [language: string]: any },
    routes: {} as LocaleRoutes,
    primaryLanguage: '',
    supportedLanguages: [] as string[],
    resolver: undefined as
      | ((language: string) => Promise<LocaleDictionary> | LocaleDictionary)
      | undefined,
    error: undefined as Error | undefined,
  },
  reducers: {
    GET_ENTRY_URI_ERROR(draft, { payload }: PayloadAction<Error>) {
      draft.error = payload;
    },
    INIT_LOCALES(
      draft,
      {
        payload,
      }: PayloadAction<
        {
          locales: Locales;
        } & I18nAppConfig
      >
    ) {
      if (payload.locales) draft.locales = payload.locales;
    },
    SET_LANGUAGE(
      draft,
      {
        payload,
      }: PayloadAction<{
        language: string;
        dictionary: LocaleDictionary;
      }>
    ) {
      draft.currentLanguage = payload.language;
      draft.dictionary = payload.dictionary;
    },
    SET_LOCALE_ROUTES(
      draft,
      {
        payload,
      }: PayloadAction<{
        routes: LocaleRoutes;
      }>
    ) {
      draft.routes = payload.routes;
    },
    SET_LOCALES(
      draft,
      {
        payload,
      }: PayloadAction<
        {
          locales: Locales;
        } & I18nAppConfig
      >
    ) {
      const { locales, ...config } = payload;
      draft.locales = locales;
      draft.primaryLanguage = config.primaryLanguage;
      draft.supportedLanguages = config.supportedLanguages;
      if (config.resolver) draft.resolver = config.resolver;
    },
    UPDATE_LANGUAGE(_draft, _: PayloadAction<UpdateLanguageActionPayload>) {
      // draft.currentLanguage = payload.language;
    },
  },
});

export const { actions, reducer, getInitialState } = i18nSlice;
export default i18nSlice;
