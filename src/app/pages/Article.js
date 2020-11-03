import React from 'react';
import PropTypes from 'prop-types';

const Article = ({ mappedEntry: { title } }) => {
  return <div>{title}</div>;
};

Article.propTypes = {
  mappedEntry: PropTypes.object,
};

export default Article;
