import React, { Fragment } from 'react';
import { hot } from 'react-hot-loader';
import RouteLoader from './routes/RouteLoader';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from 'app/theme/globalStyles';
import MainTheme from 'app/theme/theme.js';

const AppRoot = () => {
  return (
    <ThemeProvider theme={MainTheme}>
      <Fragment>
        <GlobalStyles />
        <RouteLoader />
      </Fragment>
    </ThemeProvider>
  );
};

export default hot(module)(AppRoot);
