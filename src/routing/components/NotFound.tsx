import React from 'react';

const NotFound = ({
  statusCode,
  statusText,
}: {
  statusCode: number;
  statusText: string;
}) => (
  <>
    <header>
      <h1>{statusCode || '404'} Page Not Found</h1>
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

export default NotFound;
