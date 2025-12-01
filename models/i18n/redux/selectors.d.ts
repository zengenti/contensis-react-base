import { AppState } from "../../models";
import { LocaleDictionary } from "../../models/Locales";
export declare const selectLocales: (state: AppState) => {
    [language: string]: any;
};
export declare const selectLocaleRoutes: (state: AppState) => import("../../models/Locales").LocaleRoutes;
export declare const selectCurrentLanguage: (state: AppState) => string;
export declare const selectPrimaryLanguage: (state: AppState) => string;
export declare const selectSupportedLanguages: (state: AppState) => string[];
export declare const selectDictionary: <T extends LocaleDictionary = LocaleDictionary>(state: AppState) => T;
export declare const selectDictionaryResolver: (state: AppState) => ((language: string) => Promise<LocaleDictionary> | LocaleDictionary) | undefined;
