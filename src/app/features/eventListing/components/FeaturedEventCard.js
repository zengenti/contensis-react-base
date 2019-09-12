import React from 'react';
import PropTypes from 'prop-types';

import formatDate from '../util/formatDate';

const FeaturedEventCard = ({ date, imageAlt, imagePath, title, uri }) => {
  let missingProp = false;
  [date, imageAlt, imagePath, title, uri].map(prop => {
    if (!prop || prop == '') missingProp = true;
  });
  if (missingProp) return null;
  const dateArr = date && formatDate(date, 'dd|MMM').split('|');
  return (
    <a href={uri} data-testid="eventCard">
      <img data-testid="image" src={imagePath} alt={imageAlt} />
      <div>
        <span data-testid="dateDay">{dateArr[0]}</span>
        <span data-testid="dateMonth">{dateArr[1]}</span>
      </div>
      <h3 data-testid="title">{title}</h3>
    </a>
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
