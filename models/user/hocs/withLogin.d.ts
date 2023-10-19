export default withLogin;
declare function withLogin(WrappedComponent: any): {
    (): JSX.Element;
    displayName: string;
    WrappedComponent: any;
};
