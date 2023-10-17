export default withLogin;
declare function withLogin(WrappedComponent: any): import("react-redux").ConnectedComponent<(wrappedComponentProps: {
    [key: string]: any;
}) => JSX.Element, import("react-redux").Omit<{
    [key: string]: any;
}, "error" | "isError" | "isLoading" | "user" | "isAuthenticated" | "isAuthenticationError" | "loginUser" | "logoutUser" | "authenticationError">>;
