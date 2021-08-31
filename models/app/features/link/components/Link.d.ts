export default Link;
declare function Link({ className, children, download, onClick, openInNewWindow, title, uri, }: {
    className?: string | undefined;
    children: any;
    download: any;
    onClick: any;
    openInNewWindow: any;
    title: any;
    uri: any;
}): JSX.Element;
declare namespace Link {
    namespace propTypes {
        const className: PropTypes.Requireable<string>;
        const children: PropTypes.Requireable<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        const download: PropTypes.Requireable<string>;
        const onClick: PropTypes.Requireable<(...args: any[]) => any>;
        const openInNewWindow: PropTypes.Requireable<boolean>;
        const title: PropTypes.Requireable<string>;
        const uri: PropTypes.Requireable<string>;
    }
}
import PropTypes from "prop-types";
