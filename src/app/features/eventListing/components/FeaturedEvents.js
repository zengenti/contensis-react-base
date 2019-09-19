import React from 'react';
import PropTypes from 'prop-types';

import FeaturedEventCard from './FeaturedEventCard';
import FeaturedEventsStyled from '../components.styled/FeaturedEvents.styled';

import { eventCardMapper } from '../util/eventCard.mapper';

const FeaturedEvents = ({ events }) => {
  if (!events || events.length < 1) return null;

  events = events.slice(0, 3);

  return (
    <FeaturedEventsStyled data-testid="featuredEvents">
      {events.map((event, idx) => {
        const props = eventCardMapper(event);
        return (
          <div className="feItem" key={idx}>
            <div className="feItemPadding">
              <FeaturedEventCard {...props} />
            </div>
          </div>
        );
      })}
    </FeaturedEventsStyled>
  );
};

FeaturedEvents.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),
};

export default FeaturedEvents;
