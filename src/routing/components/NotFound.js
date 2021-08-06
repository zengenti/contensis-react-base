import React from 'react';
import PropTypes from 'prop-types';

const NotFound = ({ statusCode, statusText }) => (
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

NotFound.propTypes = {
  statusCode: PropTypes.number,
  statusText: PropTypes.string,
};

export default NotFound;
