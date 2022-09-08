export default withRegistration;
declare function withRegistration(WrappedComponent: any): import("react-redux").ConnectedComponent<import("react").ComponentType<{
    [key: string]: any;
}>, import("react-redux").Omit<{
    [key: string]: any;
} & {
    children?: import("react").ReactNode;
}, "isLoading" | "error" | "user" | "registerUser" | "isSuccess"> | import("react-redux").Omit<import("react").ClassAttributes<import("react").Component<{
    [key: string]: any;
}, any, any>> & {
    [key: string]: any;
}, "isLoading" | "error" | "user" | "registerUser" | "isSuccess">>;
