import React from 'react';
import PropTypes from 'prop-types';

import FeaturedEventCard from './FeaturedEventCard';

import { eventCardMapper } from '../util/eventCard.mapper';

const FeaturedEvents = ({ events }) => {
  if (!events || events.length < 1) return null;

  events = events.slice(0, 3);

  return (
    <div data-testid="featuredEvents">
      {events.map((event, idx) => {
        const props = eventCardMapper(event);
        return <FeaturedEventCard {...props} key={idx} />;
      })}
    </div>
  );
};

FeaturedEvents.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),
};

export default FeaturedEvents;
