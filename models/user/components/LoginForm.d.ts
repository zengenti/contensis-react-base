export default LoginForm;
declare function LoginForm({ authenticationError, loading, loginUser }: {
    authenticationError: any;
    loading: any;
    loginUser: any;
}): JSX.Element;
declare namespace LoginForm {
    namespace propTypes {
        const loginException: PropTypes.Requireable<boolean>;
        const authenticationError: PropTypes.Requireable<boolean>;
        const loading: PropTypes.Requireable<boolean>;
        const loginUser: PropTypes.Requireable<(...args: any[]) => any>;
    }
}
import PropTypes from "prop-types";
