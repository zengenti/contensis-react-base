export default LoginForm;
declare function LoginForm({ authenticationError, loading, loginUser }: {
    authenticationError: any;
    loading: any;
    loginUser: any;
}): React.JSX.Element;
declare namespace LoginForm {
    namespace propTypes {
        let loginException: PropTypes.Requireable<boolean>;
        let authenticationError: PropTypes.Requireable<boolean>;
        let loading: PropTypes.Requireable<boolean>;
        let loginUser: PropTypes.Requireable<(...args: any[]) => any>;
    }
}
import React from 'react';
import PropTypes from 'prop-types';
