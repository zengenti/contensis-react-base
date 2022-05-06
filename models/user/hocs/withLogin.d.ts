export default withLogin;
declare function withLogin(WrappedComponent: any): import("react-redux").ConnectedComponent<import("react").ComponentType<{
    [key: string]: any;
}>, import("react-redux").Omit<{
    [key: string]: any;
} & {
    children?: import("react").ReactNode;
}, "isError" | "isLoading" | "error" | "user" | "isAuthenticated" | "isAuthenticationError" | "loginUser" | "logoutUser" | "authenticationError"> | import("react-redux").Omit<import("react").ClassAttributes<import("react").Component<{
    [key: string]: any;
}, any, any>> & {
    [key: string]: any;
}, "isError" | "isLoading" | "error" | "user" | "isAuthenticated" | "isAuthenticationError" | "loginUser" | "logoutUser" | "authenticationError">>;
