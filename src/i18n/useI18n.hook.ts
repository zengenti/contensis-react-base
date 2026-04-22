import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentLanguage,
  selectDictionary,
  selectLocaleRoutes,
  selectLocales,
} from './redux/selectors';
import { updateLanguage, UpdateLanguageActionPayload } from './redux/slice';
import { LocaleDictionary } from '~/models/Locales';
import { AppState } from '~/models';
import { jpath } from 'jsonpath-mapper';

// type FlattenObjectKeys<
//   T extends Record<string, unknown>,
//   Key = keyof T,
// > = Key extends string
//   ? T[Key] extends Record<string, unknown>
//     ? `${Key}.${FlattenObjectKeys<T[Key]>}`
//     : `${Key}`
//   : never;

type FlattenObjectKeys<
  T extends Record<string, unknown>,
  Key = keyof T,
> = string extends Key
  ? string
  : Key extends string
    ? T[Key] extends Record<string, unknown>
      ? `${Key}.${FlattenObjectKeys<T[Key]>}`
      : `${Key}`
    : never;

export const useI18n = <
  Dictionary extends LocaleDictionary = LocaleDictionary,
>() => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(selectCurrentLanguage);
  const dictionary = useSelector<AppState, Dictionary>(selectDictionary);
  const locales = useSelector(selectLocales);
  const routes = useSelector(selectLocaleRoutes);

  const handleSwitch = (
    language: string,
    {
      fallbackPath,
      redirect,
    }: Omit<UpdateLanguageActionPayload, 'language'> = {}
  ) => {
    console.log(`Switching language to: ${language}`);
    dispatch(updateLanguage({ language, fallbackPath, redirect }));
  };

  const translate = (
    key: FlattenObjectKeys<Dictionary>,
    defaultValue?: string
  ): string => {
    if (typeof dictionary === 'object' && Object.keys(dictionary).length) {
      if (key.includes('.') || key.includes('[')) {
        const result = jpath(key, dictionary);
        if (typeof result === 'string') return result;
      }
      if (dictionary && dictionary[key]) {
        return dictionary[key] as string;
      }
    }
    return defaultValue ?? key;
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
    updateLanguage: handleSwitch,
  };
};
