export default LogoutForm;
declare function LogoutForm({ logoutUser, user }: {
    logoutUser: any;
    user: any;
}): JSX.Element;
declare namespace LogoutForm {
    namespace propTypes {
        const logoutUser: PropTypes.Requireable<(...args: any[]) => any>;
        const user: PropTypes.Requireable<object>;
    }
}
import PropTypes from "prop-types";
