export default withRegistration;
declare function withRegistration(WrappedComponent: any): import("react-redux").ConnectedComponent<import("react").ComponentType<{
    [key: string]: any;
}>, import("react-redux").Omit<{
    [key: string]: any;
} & {
    children?: import("react").ReactNode;
}, "error" | "isLoading" | "user" | "registerUser" | "isSuccess"> | import("react-redux").Omit<import("react").ClassAttributes<import("react").Component<{
    [key: string]: any;
}, any, any>> & {
    [key: string]: any;
}, "error" | "isLoading" | "user" | "registerUser" | "isSuccess">>;
