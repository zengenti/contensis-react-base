export default NotFound;
declare function NotFound({ statusCode, statusText }: {
    statusCode: any;
    statusText: any;
}): JSX.Element;
declare namespace NotFound {
    namespace propTypes {
        const statusCode: PropTypes.Requireable<number>;
        const statusText: PropTypes.Requireable<string>;
    }
}
import PropTypes from "prop-types";
