export default Homepage;
declare function Homepage({ entry }: {
    entry: any;
}): JSX.Element;
declare namespace Homepage {
    namespace propTypes {
        const entry: PropTypes.Requireable<object>;
        const setRoute: PropTypes.Requireable<(...args: any[]) => any>;
    }
}
import PropTypes from "prop-types";
