export default LogoutForm;
declare function LogoutForm({ logoutUser, user }: {
    logoutUser: any;
    user: any;
}): React.JSX.Element;
declare namespace LogoutForm {
    namespace propTypes {
        let logoutUser: PropTypes.Requireable<(...args: any[]) => any>;
        let user: PropTypes.Requireable<object>;
    }
}
import React from 'react';
import PropTypes from 'prop-types';
