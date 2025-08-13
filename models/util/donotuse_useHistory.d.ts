/** @deprecated ponyfill for useHistory hook in react-router v5 removed in v6 */
export declare const useHistory: () => {
    push: import("react-router-dom").NavigateFunction;
    replace: import("react-router-dom").NavigateFunction;
    location: import("react-router-dom").Location<any>;
};
