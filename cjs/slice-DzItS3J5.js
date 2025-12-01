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
      if (payload.locales) draft.locales = payload.locales;
    },
    SET_LANGUAGE(draft, {
      payload
    }) {
      draft.currentLanguage = payload.language;
      draft.dictionary = payload.dictionary;
    },
    SET_LOCALE_ROUTES(draft, {
      payload
    }) {
      draft.routes = payload.routes;
    },
    SET_LOCALES(draft, {
      payload
    }) {
      const {
        locales,
        ...config
      } = payload;
      draft.locales = locales;
      draft.primaryLanguage = config.primaryLanguage;
      draft.supportedLanguages = config.supportedLanguages;
      if (config.resolver) draft.resolver = config.resolver;
    },
    UPDATE_LANGUAGE(_draft, _) {
      // draft.currentLanguage = payload.language;
    }
  }
});
const {
  actions,
  reducer,
  getInitialState
} = i18nSlice;

exports.actions = actions;
exports.getInitialState = getInitialState;
exports.i18nSlice = i18nSlice;
exports.reducer = reducer;
//# sourceMappingURL=slice-DzItS3J5.js.map
