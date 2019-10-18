import React from 'react';
import PropTypes from 'prop-types';

import SearchLayoutStyled from '../components.styled/SearchLayout.styled';
import { Container } from '../';

const SearchResults = ({ className, main }) => {
  return (
    <Container>
      <SearchLayoutStyled className={className}>
        <main className="srMain">{main}</main>
        {/* <aside className="srAside">
          <div className="columnPadding">{aside}</div>
        </aside> */}
      </SearchLayoutStyled>
    </Container>
  );
};

SearchResults.propTypes = {
  className: PropTypes.string,
  main: PropTypes.any,
  aside: PropTypes.any,
};

export default SearchResults;
