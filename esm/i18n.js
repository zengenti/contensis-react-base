import { s as selectCurrentLanguage, a as selectDictionary, b as selectLocales, c as selectLocaleRoutes } from './selectors-DcmvOeX2.js';
export { f as selectDictionaryResolver, d as selectPrimaryLanguage, e as selectSupportedLanguages } from './selectors-DcmvOeX2.js';
import { u as updateLanguage } from './slice-TYc5KMRz.js';
export { a as actions, g as getInitialState, r as reducer } from './slice-TYc5KMRz.js';
import { useDispatch, useSelector } from 'react-redux';
import { jpath } from 'jsonpath-mapper';
import '@reduxjs/toolkit';

// type FlattenObjectKeys<
//   T extends Record<string, unknown>,
//   Key = keyof T,
// > = Key extends string
//   ? T[Key] extends Record<string, unknown>
//     ? `${Key}.${FlattenObjectKeys<T[Key]>}`
//     : `${Key}`
//   : never;

const useI18n = () => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(selectCurrentLanguage);
  const dictionary = useSelector(selectDictionary);
  const locales = useSelector(selectLocales);
  const routes = useSelector(selectLocaleRoutes);
  const handleSwitch = (language, {
    fallbackPath,
    redirect
  } = {}) => {
    console.log(`Switching language to: ${language}`);
    dispatch(updateLanguage({
      language,
      fallbackPath,
      redirect
    }));
  };
  const translate = (key, defaultValue) => {
    if (typeof dictionary === 'object' && Object.keys(dictionary).length) {
      if (key.includes('.') || key.includes('[')) {
        const result = jpath(key, dictionary);
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

export { selectCurrentLanguage, selectDictionary, selectLocaleRoutes, selectLocales, updateLanguage, useI18n };
//# sourceMappingURL=i18n.js.map
