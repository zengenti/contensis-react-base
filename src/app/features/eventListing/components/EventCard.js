import React from 'react';
import PropTypes from 'prop-types';

import formatDate from '../util/formatDate';

const EventCard = ({ date, description, location, title, uri }) => {
  let missingProp = false;
  [date, description, location, title, uri].map(prop => {
    if (!prop || prop == '') missingProp = true;
  });
  if (missingProp) return null;
  const dateArr = date && formatDate(date, 'dd|MMM').split('|');
  return (
    <div data-testid="eventCard">
      <div>
        <span data-testid="dateDay">{dateArr[0]}</span>
        <span data-testid="dateMonth">{dateArr[1]}</span>
      </div>
      <h3 data-testid="title">
        <a href={uri}>{title}</a>
      </h3>
      <p data-testid="description">{description}</p>
      <div data-testid="location">{location}</div>
    </div>
  );
};

EventCard.propTypes = {
  date: PropTypes.string,
  description: PropTypes.string,
  location: PropTypes.string,
  title: PropTypes.string,
  uri: PropTypes.string,
};

export default EventCard;
