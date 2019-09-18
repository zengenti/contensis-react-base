import React from 'react';
import PropTypes from 'prop-types';

import EventCard from './EventCard';

import { eventCardMapper } from '../util/eventCard.mapper';

const FeaturedEvents = ({ events, message }) => {
  if (!events || events.length < 1)
    return <div data-testid="noResultsMessage">{message}</div>;

  return (
    <div data-testid="eventList">
      {events.map((event, idx) => {
        const props = eventCardMapper(event);
        return <EventCard {...props} key={idx} />;
      })}
    </div>
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
