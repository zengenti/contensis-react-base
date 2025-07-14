<<<<<<< HEAD
export default withLogin;
declare function withLogin(WrappedComponent: any): {
=======
import React from 'react';
declare const withLogin: (WrappedComponent: React.ComponentType) => {
>>>>>>> master
    (): React.JSX.Element;
    displayName: string;
    WrappedComponent: React.ComponentType<{}>;
};
<<<<<<< HEAD
import React from "react";
=======
export default withLogin;
>>>>>>> master
