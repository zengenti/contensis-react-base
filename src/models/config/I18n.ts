import { LocaleDictionary, Locales } from '../Locales';

export type I18nAppConfig<L extends Locales = Locales> = {
  /** The primary language code for the application */
  primaryLanguage: string;
  /** Provide the supported language codes using the same casing convention as Contensis
   * ```ts
   *   supportedLanguages: ['cy', 'en-GB', 'fr-FR', 'de-DE']
   * ```
   *  Use an empty array to fetch supported languages from the Contensis Project
   * ```ts
   *   supportedLanguages: []
   * ``` */
  supportedLanguages: string[];
  /** Supply static locales if not using the resolver
   *
   * ```ts
   *   locales: {
   *     'en-GB': { title: 'Hello World' },
   *     'fr-FR': { title: 'Bonjour le monde' },
   *   }
   * ```
   */
  locales?: L;
  /** Handle dynamic import of locale dictionaries
   *
   * ```ts
   *   // Example: Each language is in its own file in `~/locales/`,
   *   // is named using the language code e.g. `en-GB.ts`, `fr-FR.ts`
   *   // and has a default export
   *   resolver: (language: string) =>
   *     import(
   *       // webpackChunkName: "locale.[request]"
   *       `~/locales/${language}`
   *     ).then(({ default: dictionary }) => dictionary)
   * ```
   */
  resolver?: (language: string) => Promise<LocaleDictionary> | LocaleDictionary;
};
