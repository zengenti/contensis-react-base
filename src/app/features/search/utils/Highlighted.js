import React from 'react';
import PropTypes from 'prop-types';
import escapeStringRegexp from 'escape-string-regexp';
import { renderToStaticMarkup } from 'react-dom/server';
import ProjectHelper from '~/core/util/helpers';

const Highlighted = ({ text = '', highlight = '' }) => {
  if (!highlight.trim()) {
    return { __html: renderToStaticMarkup(<>{text}</>) };
  }
  const regex = new RegExp(
    `(${highlight
      .split(' ')
      .filter(word => word.length > 2)
      .map(word => escapeStringRegexp(word))
      .join('|')})`,
    'gi'
  );
  const parts = text.split(regex);
  return {
    __html: ProjectHelper.decodeEntities(
      renderToStaticMarkup(
        <>
          {parts
            .filter(part => part)
            .map((part, i) =>
              regex.test(part) ? (
                <mark key={i}>{part}</mark>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
        </>
      )
    ),
  };
};

Highlighted.propTypes = {
  text: PropTypes.string,
  highlight: PropTypes.string,
};

export default Highlighted;
