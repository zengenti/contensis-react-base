import React from 'react';

const DocumentRoot = ({ children }: React.PropsWithChildren<any>) => {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta charSet="utf-8" />
        {/* {{TITLE}}
  {{SEO_CRITICAL_METADATA}} */}
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

        <link rel="icon" href="/static/icon/favicon.ico" sizes="any" />
        <link rel="icon" href="/static/icon/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/static/icon/apple-touch-icon.png" />

        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#37bfa7"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#002033"
        />
        <link rel="manifest" href="/static/manifest.webmanifest" />

        {/* {{CRITICAL_CSS}} */}
      </head>

      <body>
        {children}
        {/* <div id="root">{{APP}}</div> */}

        {/* {{REDUX_DATA}} */}

        {/* {{LOADABLE_CHUNKS}} */}
      </body>
    </html>
  );
};

export default DocumentRoot;
