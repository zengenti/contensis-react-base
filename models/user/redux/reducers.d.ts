export declare const initialUserState: {
    authenticationState: {
        authenticated: boolean;
        authenticationError: boolean;
        authenticationErrorMessage: null;
        clientCredentials: null;
        error: boolean;
        errorMessage: null;
        loading: boolean;
    };
    passwordResetRequest: {
        isSending: boolean;
        sent: boolean;
        error: null;
    };
    resetPassword: {
        isSending: boolean;
        sent: boolean;
        error: null;
    };
    changePassword: {
        isSending: boolean;
        sent: boolean;
        error: null;
    };
    groups: never[];
};
declare const _default: <Base extends {
    readonly authenticationState: {
        readonly authenticated: boolean;
        readonly authenticationError: boolean;
        readonly authenticationErrorMessage: null;
        readonly clientCredentials: null;
        readonly error: boolean;
        readonly errorMessage: null;
        readonly loading: boolean;
    };
    readonly passwordResetRequest: {
        readonly isSending: boolean;
        readonly sent: boolean;
        readonly error: null;
    };
    readonly resetPassword: {
        readonly isSending: boolean;
        readonly sent: boolean;
        readonly error: null;
    };
    readonly changePassword: {
        readonly isSending: boolean;
        readonly sent: boolean;
        readonly error: null;
    };
    readonly groups: readonly never[];
}>(base?: Base | undefined, action: any) => any;
export default _default;
