'use strict';

const selectLocales = state => state.i18n.locales;
const selectLocaleRoutes = state => state.i18n.routes;
const selectCurrentLanguage = state => state.i18n.currentLanguage;
const selectPrimaryLanguage = state => state.i18n.primaryLanguage;
const selectSupportedLanguages = state => state.i18n.supportedLanguages;
const selectDictionary = state => state.i18n.dictionary;
const selectDictionaryResolver = state => state.i18n.resolver;

exports.selectCurrentLanguage = selectCurrentLanguage;
exports.selectDictionary = selectDictionary;
exports.selectDictionaryResolver = selectDictionaryResolver;
exports.selectLocaleRoutes = selectLocaleRoutes;
exports.selectLocales = selectLocales;
exports.selectPrimaryLanguage = selectPrimaryLanguage;
exports.selectSupportedLanguages = selectSupportedLanguages;
//# sourceMappingURL=selectors-DAQR0uZa.js.map
