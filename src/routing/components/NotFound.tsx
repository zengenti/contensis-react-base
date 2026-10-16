import React from 'react';

const STATUS_TEXT = {
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Page Not Found',
  500: 'Something Went Wrong',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
} as const;

const NotFound = ({
  statusCode = 404,
  statusText,
}: {
  statusCode?: number;
  statusText?: string;
}) => {
  // An unmapped 5xx must not read "Page Not Found" — e.g. a 504 from the
  // sign-in chain is a service failure, not a missing page.
  const label =
    STATUS_TEXT[statusCode as keyof typeof STATUS_TEXT] ??
    (statusCode >= 500 ? STATUS_TEXT[500] : STATUS_TEXT[404]);

  return (
    <>
      <header>
        <h1>{statusCode} {label}</h1>
        {statusText && (
          <h2
            style={{
              background: '#eee',
              color: '#666',
              fontSize: '100%',
              padding: '10px',
            }}
          >
            {statusText}
          </h2>
        )}
      </header>
    </>
  );
}

export default NotFound;
