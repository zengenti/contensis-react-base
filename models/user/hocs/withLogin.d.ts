export default withLogin;
declare function withLogin(WrappedComponent: any): import("react-redux").ConnectedComponent<import("react").ComponentType<{
    [key: string]: any;
}>, import("react-redux").Omit<{
    [key: string]: any;
}, "error" | "isLoading" | "authenticationError" | "user" | "loginUser" | "logoutUser" | "isAuthenticated"> | import("react-redux").Omit<import("react").ClassAttributes<import("react").Component<{
    [key: string]: any;
}, any, any>> & {
    [key: string]: any;
}, "error" | "isLoading" | "authenticationError" | "user" | "loginUser" | "logoutUser" | "isAuthenticated">>;
