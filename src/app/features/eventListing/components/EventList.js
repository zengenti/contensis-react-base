import React from 'react';
import PropTypes from 'prop-types';

import EventCard from './EventCard';
import EventListStyled from '../components.styled/EventList.styled';

import { eventCardMapper } from '../util/eventCard.mapper';

const FeaturedEvents = ({ events, message }) => {
  if (!events || events.length < 1)
    return <div data-testid="noResultsMessage">{message}</div>;

  return (
    <EventListStyled data-testid="eventList">
      {events.map((event, idx) => {
        const props = eventCardMapper(event);
        return (
          <li className="elItem" key={idx}>
            <EventCard {...props} />
          </li>
        );
      })}
    </EventListStyled>
  );
};

FeaturedEvents.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),
  message: PropTypes.string,
};

FeaturedEvents.defaultProps = {
  message: 'No results found',
};

export default FeaturedEvents;
