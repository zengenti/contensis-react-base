import React from 'react';
import PropTypes from 'prop-types';

import ResultCard from './ResultCard';
import FeaturedResultsStyled from '../components.styled/FeaturedResults.styled';

const FeaturedResults = ({ className, cards, searchTerm }) => {
  return (
    <FeaturedResultsStyled className={className}>
      <div className="frRow">
        {cards.map((card, idx) => {
          const resultCard = card;
          return (
            <ResultCard
              key={idx}
              {...resultCard}
              isFeaturedCard={card.type == 'searchOneboxResults1'}
              searchTerm={searchTerm}
            />
          );
        })}
      </div>
    </FeaturedResultsStyled>
  );
};

FeaturedResults.propTypes = {
  className: PropTypes.string,
  cards: PropTypes.arrayOf(PropTypes.object),
  searchTerm: PropTypes.string,
};

export default FeaturedResults;
