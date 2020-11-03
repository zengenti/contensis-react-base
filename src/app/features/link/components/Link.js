import React from 'react';
import PropTypes from 'prop-types';
import { Link as PageLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const Link = ({
  className = '',
  children,
  download,
  onClick,
  openInNewWindow,
  title,
  uri,
}) => {
  className += ' Link';
  if (!uri) {
    return <span className={className}>{children}</span>;
  }

  let newWindow = openInNewWindow ? '_blank' : '_self';
  uri = encodeURI(uri);

  if (newWindow != '_blank' && uri && uri.startsWith('/')) {
    if (uri.indexOf('#') > -1) {
      return (
        <HashLink
          className={className}
          download={download}
          onClick={onClick}
          title={title}
          to={uri}
        >
          {children}
        </HashLink>
      );
    }
    return (
      <PageLink
        className={className}
        download={download}
        onClick={onClick}
        title={title}
        to={uri}
      >
        {children}
      </PageLink>
    );
  } else {
    return (
      <a
        className={className}
        download={download}
        href={uri}
        onClick={onClick}
        target={newWindow}
        title={title}
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }
};

Link.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
  download: PropTypes.string,
  onClick: PropTypes.func,
  openInNewWindow: PropTypes.bool,
  title: PropTypes.string,
  uri: PropTypes.string,
};

export default Link;
