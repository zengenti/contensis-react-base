export default Login;
declare function Login({ error, authenticationError, isAuthenticated, isLoading, user, loginUser, logoutUser, }: {
    error: any;
    authenticationError: any;
    isAuthenticated: any;
    isLoading: any;
    user: any;
    loginUser: any;
    logoutUser: any;
}): JSX.Element;
declare namespace Login {
    namespace propTypes {
        const loginUser: PropTypes.Requireable<(...args: any[]) => any>;
        const logoutUser: PropTypes.Requireable<(...args: any[]) => any>;
        const isLoading: PropTypes.Requireable<boolean>;
        const isAuthenticated: PropTypes.Requireable<boolean>;
        const authenticationError: PropTypes.Requireable<string>;
        const error: PropTypes.Requireable<string>;
        const user: PropTypes.Requireable<object>;
        const updateUserLoginState: PropTypes.Requireable<(...args: any[]) => any>;
    }
}
import PropTypes from "prop-types";
