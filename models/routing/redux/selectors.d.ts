import { AppState, StateType } from "../../models";
export declare const selectRouteEntry: (state: AppState, returnType?: StateType) => any;
export declare const selectMappedEntry: (state: AppState, returnType?: StateType) => any;
export declare const selectSurrogateKeys: (state: AppState) => any;
export declare const selectSsrApiCalls: (state: AppState) => any;
export declare const selectCurrentHostname: (state: AppState) => any;
export declare const selectCurrentTreeID: (state: AppState) => any;
export declare const selectRouteEntryEntryId: (state: AppState) => any;
export declare const selectRouteEntryContentTypeId: (state: AppState) => any;
export declare const selectRouteEntryLanguage: (state: AppState) => any;
export declare const selectRouteEntrySlug: (state: AppState) => any;
export declare const selectRouteEntryID: (state: AppState) => any;
export declare const selectCanonicalPath: (state: AppState) => any;
export declare const selectCurrentPath: (state: AppState) => any;
export declare const selectCurrentLocation: (state: AppState) => any;
export declare const selectCurrentSearch: (state: AppState) => any;
export declare const selectCurrentHash: (state: AppState) => any;
export declare const selectQueryStringAsObject: ((state: AppState) => any) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: any) => any;
    memoizedResultFunc: ((resultFuncArgs_0: any) => any) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => any;
    dependencies: [(state: AppState) => any];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    memoize: typeof import("reselect").weakMapMemoize;
    argsMemoize: typeof import("reselect").weakMapMemoize;
};
export declare const selectCurrentProject: (state: AppState) => any;
export declare const selectIsNotFound: (state: AppState) => any;
export declare const selectCurrentAncestors: (state: AppState) => any;
export declare const selectCurrentSiblings: (state: AppState) => any;
export declare const selectCurrentNode: (state: AppState, returnType?: StateType) => any;
export declare const selectCurrentChildren: (state: any) => any;
export declare const selectBreadcrumb: ((state: AppState, returnType?: StateType | undefined) => any[]) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: any, resultFuncArgs_1: any) => any[];
    memoizedResultFunc: ((resultFuncArgs_0: any, resultFuncArgs_1: any) => any[]) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => any[];
    dependencies: [(state: AppState) => any, (state: AppState, returnType?: StateType) => any];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    memoize: typeof import("reselect").weakMapMemoize;
    argsMemoize: typeof import("reselect").weakMapMemoize;
};
export declare const selectRouteErrorMessage: (state: AppState) => any;
export declare const selectRouteIsError: (state: AppState) => any;
export declare const selectRouteLoading: (state: AppState) => any;
export declare const selectRouteStatusCode: (state: AppState) => any;
export declare const selectStaticRoute: (state: AppState) => any;
