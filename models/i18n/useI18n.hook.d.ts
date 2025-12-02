import { UpdateLanguageActionPayload } from './redux/slice';
import { LocaleDictionary } from "../models/Locales";
type FlattenObjectKeys<T extends Record<string, unknown>, Key = keyof T> = string extends Key ? string : Key extends string ? T[Key] extends Record<string, unknown> ? `${Key}.${FlattenObjectKeys<T[Key]>}` : `${Key}` : never;
export declare const useI18n: <Dictionary extends LocaleDictionary = LocaleDictionary>() => {
    /** The language that is currently active */
    currentLanguage: string;
    /** The dictionary loaded for the current language / locale */
    dictionary: Dictionary;
    /** The locales from the redux store */
    locales: {
        [language: string]: any;
    };
    /** Localised routes (paths) from the redux store */
    routes: import("../models/Locales").LocaleRoutes;
    /** A function to translate keys into localized strings supporting nested keys supplied with dot notation */
    translate: (key: FlattenObjectKeys<Dictionary>, defaultValue?: string) => string;
    /** A function that dispatches a redux action to update the current language */
    updateLanguage: (language: string, { fallbackPath, redirect, }?: Omit<UpdateLanguageActionPayload, "language">) => void;
};
export {};
