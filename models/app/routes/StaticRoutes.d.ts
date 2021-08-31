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
    component: any;
    fetchNode?: undefined;
    ssr?: undefined;
    requireLogin?: undefined;
} | {
    path: string;
    exact: boolean;
    requireLogin: boolean;
    component: any;
    fetchNode?: undefined;
    ssr?: undefined;
})[];
export default _default;
