import React from 'react';
import PropTypes from 'prop-types';

const Homepage = ({ entry }) => (
  <h1>Hello world {entry && entry.entryTitle}</h1>
);

Homepage.propTypes = {
  entry: PropTypes.object,
};

export default Homepage;
