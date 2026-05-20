import { PayloadAction } from '@reduxjs/toolkit';
import { I18nAppConfig } from "../../models/config/I18n";
import { LocaleDictionary, LocaleRoutes, Locales } from "../../models/Locales";
export type UpdateLanguageActionPayload = {
    language: string;
    redirect?: boolean | string;
    fallbackPath?: string;
};
declare const i18nSlice: import("@reduxjs/toolkit").Slice<{
    currentLanguage: string;
    dictionary: LocaleDictionary;
    locales: {
        [language: string]: any;
    };
    routes: LocaleRoutes;
    primaryLanguage: string;
    supportedLanguages: string[];
    resolver: ((language: string) => Promise<LocaleDictionary> | LocaleDictionary) | undefined;
    error: Error | undefined;
}, {
    GET_ENTRY_URI_ERROR(draft: {
        currentLanguage: string;
        dictionary: {
            [x: string]: any;
        };
        locales: {
            [x: string]: any;
        };
        routes: {
            [x: string]: {
                [x: string]: string;
            };
        };
        primaryLanguage: string;
        supportedLanguages: string[];
        resolver: ((language: string) => Promise<LocaleDictionary> | LocaleDictionary) | undefined;
        error: {
            name: string;
            message: string;
            stack?: string | undefined;
            cause?: unknown;
        } | undefined;
    }, { payload }: PayloadAction<Error>): void;
    INIT_LOCALES(draft: {
        currentLanguage: string;
        dictionary: {
            [x: string]: any;
        };
        locales: {
            [x: string]: any;
        };
        routes: {
            [x: string]: {
                [x: string]: string;
            };
        };
        primaryLanguage: string;
        supportedLanguages: string[];
        resolver: ((language: string) => Promise<LocaleDictionary> | LocaleDictionary) | undefined;
        error: {
            name: string;
            message: string;
            stack?: string | undefined;
            cause?: unknown;
        } | undefined;
    }, { payload, }: PayloadAction<{
        locales: Locales;
        routes: LocaleRoutes;
    } & I18nAppConfig>): void;
    SET_LANGUAGE(draft: {
        currentLanguage: string;
        dictionary: {
            [x: string]: any;
        };
        locales: {
            [x: string]: any;
        };
        routes: {
            [x: string]: {
                [x: string]: string;
            };
        };
        primaryLanguage: string;
        supportedLanguages: string[];
        resolver: ((language: string) => Promise<LocaleDictionary> | LocaleDictionary) | undefined;
        error: {
            name: string;
            message: string;
            stack?: string | undefined;
            cause?: unknown;
        } | undefined;
    }, { payload, }: PayloadAction<{
        language: string;
        dictionary: LocaleDictionary;
        redirect?: string;
    }>): void;
    SET_LOCALES(draft: {
        currentLanguage: string;
        dictionary: {
            [x: string]: any;
        };
        locales: {
            [x: string]: any;
        };
        routes: {
            [x: string]: {
                [x: string]: string;
            };
        };
        primaryLanguage: string;
        supportedLanguages: string[];
        resolver: ((language: string) => Promise<LocaleDictionary> | LocaleDictionary) | undefined;
        error: {
            name: string;
            message: string;
            stack?: string | undefined;
            cause?: unknown;
        } | undefined;
    }, { payload, }: PayloadAction<{
        locales: Locales;
    } & I18nAppConfig>): void;
    /** UPDATE_LANGUAGE action triggers updateLanguage saga and ends with SET_LANGUAGE */
    UPDATE_LANGUAGE(_draft: {
        currentLanguage: string;
        dictionary: {
            [x: string]: any;
        };
        locales: {
            [x: string]: any;
        };
        routes: {
            [x: string]: {
                [x: string]: string;
            };
        };
        primaryLanguage: string;
        supportedLanguages: string[];
        resolver: ((language: string) => Promise<LocaleDictionary> | LocaleDictionary) | undefined;
        error: {
            name: string;
            message: string;
            stack?: string | undefined;
            cause?: unknown;
        } | undefined;
    }, _: PayloadAction<UpdateLanguageActionPayload>): void;
}, "i18n", "i18n", import("@reduxjs/toolkit").SliceSelectors<{
    currentLanguage: string;
    dictionary: LocaleDictionary;
    locales: {
        [language: string]: any;
    };
    routes: LocaleRoutes;
    primaryLanguage: string;
    supportedLanguages: string[];
    resolver: ((language: string) => Promise<LocaleDictionary> | LocaleDictionary) | undefined;
    error: Error | undefined;
}>>;
export declare const actions: import("@reduxjs/toolkit").CaseReducerActions<{
    GET_ENTRY_URI_ERROR(draft: {
        currentLanguage: string;
        dictionary: {
            [x: string]: any;
        };
        locales: {
            [x: string]: any;
        };
        routes: {
            [x: string]: {
                [x: string]: string;
            };
        };
        primaryLanguage: string;
        supportedLanguages: string[];
        resolver: ((language: string) => Promise<LocaleDictionary> | LocaleDictionary) | undefined;
        error: {
            name: string;
            message: string;
            stack?: string | undefined;
            cause?: unknown;
        } | undefined;
    }, { payload }: PayloadAction<Error>): void;
    INIT_LOCALES(draft: {
        currentLanguage: string;
        dictionary: {
            [x: string]: any;
        };
        locales: {
            [x: string]: any;
        };
        routes: {
            [x: string]: {
                [x: string]: string;
            };
        };
        primaryLanguage: string;
        supportedLanguages: string[];
        resolver: ((language: string) => Promise<LocaleDictionary> | LocaleDictionary) | undefined;
        error: {
            name: string;
            message: string;
            stack?: string | undefined;
            cause?: unknown;
        } | undefined;
    }, { payload, }: PayloadAction<{
        locales: Locales;
        routes: LocaleRoutes;
    } & I18nAppConfig>): void;
    SET_LANGUAGE(draft: {
        currentLanguage: string;
        dictionary: {
            [x: string]: any;
        };
        locales: {
            [x: string]: any;
        };
        routes: {
            [x: string]: {
                [x: string]: string;
            };
        };
        primaryLanguage: string;
        supportedLanguages: string[];
        resolver: ((language: string) => Promise<LocaleDictionary> | LocaleDictionary) | undefined;
        error: {
            name: string;
            message: string;
            stack?: string | undefined;
            cause?: unknown;
        } | undefined;
    }, { payload, }: PayloadAction<{
        language: string;
        dictionary: LocaleDictionary;
        redirect?: string;
    }>): void;
    SET_LOCALES(draft: {
        currentLanguage: string;
        dictionary: {
            [x: string]: any;
        };
        locales: {
            [x: string]: any;
        };
        routes: {
            [x: string]: {
                [x: string]: string;
            };
        };
        primaryLanguage: string;
        supportedLanguages: string[];
        resolver: ((language: string) => Promise<LocaleDictionary> | LocaleDictionary) | undefined;
        error: {
            name: string;
            message: string;
            stack?: string | undefined;
            cause?: unknown;
        } | undefined;
    }, { payload, }: PayloadAction<{
        locales: Locales;
    } & I18nAppConfig>): void;
    /** UPDATE_LANGUAGE action triggers updateLanguage saga and ends with SET_LANGUAGE */
    UPDATE_LANGUAGE(_draft: {
        currentLanguage: string;
        dictionary: {
            [x: string]: any;
        };
        locales: {
            [x: string]: any;
        };
        routes: {
            [x: string]: {
                [x: string]: string;
            };
        };
        primaryLanguage: string;
        supportedLanguages: string[];
        resolver: ((language: string) => Promise<LocaleDictionary> | LocaleDictionary) | undefined;
        error: {
            name: string;
            message: string;
            stack?: string | undefined;
            cause?: unknown;
        } | undefined;
    }, _: PayloadAction<UpdateLanguageActionPayload>): void;
}, "i18n">, reducer: import("../../../node_modules/redux").Reducer<{
    currentLanguage: string;
    dictionary: LocaleDictionary;
    locales: {
        [language: string]: any;
    };
    routes: LocaleRoutes;
    primaryLanguage: string;
    supportedLanguages: string[];
    resolver: ((language: string) => Promise<LocaleDictionary> | LocaleDictionary) | undefined;
    error: Error | undefined;
}>, getInitialState: () => {
    currentLanguage: string;
    dictionary: LocaleDictionary;
    locales: {
        [language: string]: any;
    };
    routes: LocaleRoutes;
    primaryLanguage: string;
    supportedLanguages: string[];
    resolver: ((language: string) => Promise<LocaleDictionary> | LocaleDictionary) | undefined;
    error: Error | undefined;
};
export declare const updateLanguage: import("@reduxjs/toolkit").ActionCreatorWithPayload<UpdateLanguageActionPayload, "i18n/UPDATE_LANGUAGE">;
export default i18nSlice;
