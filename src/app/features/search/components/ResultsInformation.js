import React from 'react';
import PropTypes from 'prop-types';

import getResultsInformation from '../utils/getResultsInformation';

const ResultsInformation = ({ paging, searchTerm }) => {
  const resultsInfo = getResultsInformation(paging, searchTerm);
  return (
    <>
      {resultsInfo && (
        <p
          className="resultsInfo"
          dangerouslySetInnerHTML={{ __html: resultsInfo }}
        />
      )}
    </>
  );
};

ResultsInformation.propTypes = {
  paging: PropTypes.object,
  searchTerm: PropTypes.string,
};

export default ResultsInformation;
