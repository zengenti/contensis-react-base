import React from 'react';
import PropTypes from 'prop-types';

import FeaturedEventCardStyled from '../components.styled/FeaturedEventCard.styled';

import formatDate from '../util/formatDate';

const FeaturedEventCard = ({ date, imageAlt, imagePath, title, uri }) => {
  let missingProp = false;
  [date, imageAlt, imagePath, title, uri].map(prop => {
    if (!prop || prop == '') missingProp = true;
  });
  if (missingProp) return null;
  const dateArr = date && formatDate(date, 'dd|MMM').split('|');
  return (
    <FeaturedEventCardStyled href={uri} data-testid="eventCard">
      <img
        data-testid="image"
        src={imagePath}
        alt={imageAlt}
        className="fecImage"
      />
      <div className="fecDate">
        <div className="fecDateInner">
          <span data-testid="dateDay" className="fecDateDay">
            {dateArr[0]}
          </span>
          <span data-testid="dateMonth" className="fecDateMonth">
            {dateArr[1]}
          </span>
        </div>
      </div>
      <h3 data-testid="title" className="fecTitle">
        {title}
      </h3>
    </FeaturedEventCardStyled>
  );
};

FeaturedEventCard.propTypes = {
  date: PropTypes.string,
  imageAlt: PropTypes.string,
  imagePath: PropTypes.string,
  title: PropTypes.string,
  uri: PropTypes.string,
};

export default FeaturedEventCard;
