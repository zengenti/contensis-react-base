import React from 'react';
import PropTypes from 'prop-types';

import bindCardProps from '../utils/bindCardProps';
import ResultCard from './ResultCard';
import ResultCardListStyled from '../components.styled/ResultCardList.styled';

const ResultCardList = ({
  className,
  cards,
  rootUri,
  searchTerm,
  contentTypes,
  replaceResultsPath,
}) => {
  return (
    <ResultCardListStyled className={className}>
      {(!cards || cards.length < 1) && <p>No results found</p>}
      {cards && cards.length > 0 && (
        <React.Fragment>
          {cards.map((card, idx) => {
            const resultCard = bindCardProps(
              card,
              rootUri,
              contentTypes,
              replaceResultsPath
            );
            return (
              <div className="fclItem" key={idx}>
                <div className="fclItemPadding">
                  {<ResultCard {...resultCard} searchTerm={searchTerm} />}
                </div>
              </div>
            );
          })}
        </React.Fragment>
      )}
    </ResultCardListStyled>
  );
};

ResultCardList.propTypes = {
  className: PropTypes.string,
  cards: PropTypes.arrayOf(PropTypes.object),
  paging: PropTypes.object,
  rootUri: PropTypes.string,
  searchTerm: PropTypes.string,
  contentTypes: PropTypes.array,
  replaceResultsPath: PropTypes.array,
};

export default ResultCardList;
