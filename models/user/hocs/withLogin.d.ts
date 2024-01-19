export default withLogin;
declare function withLogin(WrappedComponent: any): {
    (): React.JSX.Element;
    displayName: string;
    WrappedComponent: any;
};
import React from "react";
