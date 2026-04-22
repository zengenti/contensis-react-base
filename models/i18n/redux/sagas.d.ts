import type { Action } from '@reduxjs/toolkit';
import type { Entry, Node } from 'contensis-delivery-api';
import { SET_ENTRY } from "../../routing/redux/types";
export declare const i18nSagas: import("redux-saga/effects").ForkEffect<never>[];
/**
 * Resolve the current route language based on the entry, node, static route or path
 * Is called directly from the routing saga as soon as an entry or node has been fetched
 */
export declare function resolveCurrentRouteLanguage({ entry, node, }: Action<typeof SET_ENTRY> & {
    entry: Entry | null;
    node: Node | null;
}): Generator<import("redux-saga/effects").SelectEffect | import("redux-saga/effects").CallEffect<any> | import("redux-saga/effects").PutEffect<{
    payload: {
        language: string;
        dictionary: import("../../models/Locales").LocaleDictionary;
        redirect?: string;
    };
    type: "i18n/SET_LANGUAGE";
}>, void, any>;
