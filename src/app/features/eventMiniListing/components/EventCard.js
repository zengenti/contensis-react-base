import React from 'react';
import PropTypes from 'prop-types';

import EventCardStyled from '../components.styled/EventCard.styled';

import formatDate from '../util/formatDate';

const EventCard = ({ date, description, location, title, uri }) => {
  let missingProp = false;
  [date, description, location, title, uri].map(prop => {
    if (!prop || prop == '') missingProp = true;
  });
  if (missingProp) return null;
  const dateArr = date && formatDate(date, 'dd|MMM').split('|');
  return (
    <EventCardStyled data-testid="eventCard">
      <div className="ecDate">
        <div className="ecDateInner">
          <span className="ecDateDay" data-testid="dateDay">
            {dateArr[0]}
          </span>
          <span className="ecDateMonth" data-testid="dateMonth">
            {dateArr[1]}
          </span>
        </div>
      </div>
      <div className="ecContent">
        <h3 className="ecTitle" data-testid="title">
          <a href={uri}>{title}</a>
        </h3>
        <p className="ecDescription" data-testid="description">
          {description}
        </p>
        <div className="ecLocation" data-testid="location">
          {location}
        </div>
      </div>
    </EventCardStyled>
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
