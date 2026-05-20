/** @deprecated ponyfill for useHistory hook in react-router v5 removed in v6 */
export declare const useHistory: () => {
    push: import("react-router").NavigateFunction;
    replace: import("react-router").NavigateFunction;
    location: import("react-router").Location<any>;
};
