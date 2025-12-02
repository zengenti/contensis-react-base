'use strict';

var toolkit = require('@reduxjs/toolkit');

const i18nSlice = toolkit.createSlice({
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

exports.actions = actions;
exports.getInitialState = getInitialState;
exports.i18nSlice = i18nSlice;
exports.reducer = reducer;
exports.updateLanguage = updateLanguage;
//# sourceMappingURL=slice-Q_VcvbKA.js.map
