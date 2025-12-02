import { createSlice } from '@reduxjs/toolkit';

const i18nSlice = createSlice({
  name: 'i18n',
  initialState: {
    currentLanguage: '',
    dictionary: {},
    locales: {},
    routes: {},
    primaryLanguage: '',
    supportedLanguages: [],
    resolver: undefined,
    error: undefined
  },
  reducers: {
    GET_ENTRY_URI_ERROR(draft, {
      payload
    }) {
      draft.error = payload;
    },
    INIT_LOCALES(draft, {
      payload
    }) {
      draft.locales = payload.locales;
      draft.routes = payload.routes;
      draft.primaryLanguage = payload.primaryLanguage;
      draft.supportedLanguages = payload.supportedLanguages;
      if (payload.resolver) draft.resolver = payload.resolver;
    },
    SET_LANGUAGE(draft, {
      payload
    }) {
      draft.currentLanguage = payload.language;
      draft.dictionary = payload.dictionary;
    },
    SET_LOCALES(draft, {
      payload
    }) {
      draft.locales = payload.locales;
      draft.primaryLanguage = payload.primaryLanguage;
      draft.supportedLanguages = payload.supportedLanguages;
      if (payload.resolver) draft.resolver = payload.resolver;
    },
    /** UPDATE_LANGUAGE action triggers updateLanguage saga and ends with SET_LANGUAGE */
    UPDATE_LANGUAGE(_draft, _) {}
  }
});
const {
  actions,
  reducer,
  getInitialState
} = i18nSlice;

// Alias some nicer named exports for the actions
const updateLanguage = actions.UPDATE_LANGUAGE;

export { actions as a, getInitialState as g, i18nSlice as i, reducer as r, updateLanguage as u };
//# sourceMappingURL=slice-TYc5KMRz.js.map
