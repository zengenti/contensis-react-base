import React from 'react';
import PropTypes from 'prop-types';

import VisuallyHiddenStyled from '../components.styled/VisuallyHidden.styled';

const VisuallyHidden = ({ text, children }) => {
  return (
    <VisuallyHiddenStyled>
      {text}
      {children}
    </VisuallyHiddenStyled>
  );
};

VisuallyHidden.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node,
};

export default VisuallyHidden;
