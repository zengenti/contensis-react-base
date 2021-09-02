export declare const initialUserState: {
    authenticationState: {
        authenticated: boolean;
        authenticationError: boolean;
        clientCredentials: null;
        error: boolean;
        loading: boolean;
    };
    groups: never[];
};
declare const _default: <Base extends {
    readonly authenticationState: {
        readonly authenticated: boolean;
        readonly authenticationError: boolean;
        readonly clientCredentials: null;
        readonly error: boolean;
        readonly loading: boolean;
    };
    readonly groups: readonly never[];
}>(base?: Base | undefined, action: any) => any;
export default _default;
