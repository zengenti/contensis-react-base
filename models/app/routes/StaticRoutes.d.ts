declare var _default: ({
    path: string;
    exact: boolean;
    fetchNode: boolean;
    ssr: boolean;
    component: any;
    requireLogin?: undefined;
} | {
    path: string;
    exact: boolean;
    component: import("react").ComponentType<any> & Loadable.LoadableComponent;
    fetchNode?: undefined;
    ssr?: undefined;
    requireLogin?: undefined;
} | {
    path: string;
    exact: boolean;
    requireLogin: boolean;
    component: import("react").ComponentType<any> & Loadable.LoadableComponent;
    fetchNode?: undefined;
    ssr?: undefined;
})[];
export default _default;
import Loadable from "react-loadable";
