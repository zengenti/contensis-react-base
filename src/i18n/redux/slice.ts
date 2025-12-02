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
          routes: LocaleRoutes;
        } & I18nAppConfig
      >
    ) {
      draft.locales = payload.locales;
      draft.routes = payload.routes;
      draft.primaryLanguage = payload.primaryLanguage;
      draft.supportedLanguages = payload.supportedLanguages;
      if (payload.resolver) draft.resolver = payload.resolver;
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
      draft.locales = payload.locales;
      draft.primaryLanguage = payload.primaryLanguage;
      draft.supportedLanguages = payload.supportedLanguages;
      if (payload.resolver) draft.resolver = payload.resolver;
    },
    /** UPDATE_LANGUAGE action triggers updateLanguage saga and ends with SET_LANGUAGE */
    UPDATE_LANGUAGE(_draft, _: PayloadAction<UpdateLanguageActionPayload>) {},
  },
});

export const { actions, reducer, getInitialState } = i18nSlice;

// Alias some nicer named exports for the actions
export const updateLanguage = actions.UPDATE_LANGUAGE;

export default i18nSlice;
