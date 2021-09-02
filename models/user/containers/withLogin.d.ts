export default withLogin;
declare function withLogin(WrappedComponent: any): import("react-redux").ConnectedComponent<(wrappedComponentProps: any) => JSX.Element, import("react-redux").Omit<any, "isLoading" | "user" | "error" | "authenticationError" | "loginUser" | "logoutUser" | "isAuthenticated">>;
