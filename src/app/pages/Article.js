import React from 'react';
import PropTypes from 'prop-types';

const Article = ({ entry, mappedEntry: { title } }) => {
  return <div>{(entry && entry.entryTitle) || title}</div>;
};

Article.propTypes = {
  entry: PropTypes.object,
  mappedEntry: PropTypes.object,
};

export default Article;
