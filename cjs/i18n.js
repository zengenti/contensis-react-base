'use strict';

var selectors = require('./selectors-DAQR0uZa.js');
var slice = require('./slice-DxcXAngA.js');
var reactRedux = require('react-redux');
var mapJson = require('jsonpath-mapper');
require('@reduxjs/toolkit');

// type FlattenObjectKeys<
//   T extends Record<string, unknown>,
//   Key = keyof T,
// > = Key extends string
//   ? T[Key] extends Record<string, unknown>
//     ? `${Key}.${FlattenObjectKeys<T[Key]>}`
//     : `${Key}`
//   : never;

const useI18n = () => {
  const dispatch = reactRedux.useDispatch();
  const currentLanguage = reactRedux.useSelector(selectors.selectCurrentLanguage);
  const dictionary = reactRedux.useSelector(selectors.selectDictionary);
  const locales = reactRedux.useSelector(selectors.selectLocales);
  const routes = reactRedux.useSelector(selectors.selectLocaleRoutes);
  const handleSwitch = (language, {
    fallbackPath,
    redirect
  } = {}) => {
    console.log(`Switching language to: ${language}`);
    dispatch(slice.updateLanguage({
      language,
      fallbackPath,
      redirect
    }));
  };
  const translate = (key, defaultValue) => {
    if (typeof dictionary === 'object' && Object.keys(dictionary).length) {
      if (key.includes('.') || key.includes('[')) {
        const result = mapJson.jpath(key, dictionary);
        if (typeof result === 'string') return result;
      }
      if (dictionary && dictionary[key]) {
        return dictionary[key];
      }
    }
    return defaultValue != null ? defaultValue : key;
  };
  return {
    /** The language that is currently active */
    currentLanguage,
    /** The dictionary loaded for the current language / locale */
    dictionary,
    /** The locales from the redux store */
    locales,
    /** Localised routes (paths) from the redux store */
    routes,
    /** A function to translate keys into localized strings supporting nested keys supplied with dot notation */
    translate,
    /** A function that dispatches a redux action to update the current language */
    updateLanguage: handleSwitch
  };
};

exports.selectCurrentLanguage = selectors.selectCurrentLanguage;
exports.selectDictionary = selectors.selectDictionary;
exports.selectDictionaryResolver = selectors.selectDictionaryResolver;
exports.selectLocaleRoutes = selectors.selectLocaleRoutes;
exports.selectLocales = selectors.selectLocales;
exports.selectPrimaryLanguage = selectors.selectPrimaryLanguage;
exports.selectSupportedLanguages = selectors.selectSupportedLanguages;
exports.actions = slice.actions;
exports.getInitialState = slice.getInitialState;
exports.reducer = slice.reducer;
exports.updateLanguage = slice.updateLanguage;
exports.useI18n = useI18n;
//# sourceMappingURL=i18n.js.map
