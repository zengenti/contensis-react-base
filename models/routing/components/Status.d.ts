export function Status({ code, children }: {
    code: any;
    children: any;
}): JSX.Element;
export namespace Status {
    namespace propTypes {
        const code: PropTypes.Validator<number>;
        const children: PropTypes.Requireable<PropTypes.ReactElementLike>;
    }
}
import PropTypes from "prop-types";
