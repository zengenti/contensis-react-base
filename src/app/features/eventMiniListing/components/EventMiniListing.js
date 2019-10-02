import React from 'react';
import PropTypes from 'prop-types';

import EventCard from './EventCard';
import FeaturedEventCard from './FeaturedEventCard';
import EventMiniListingStyled from '../components.styled/EventMiniListing.styled';

import { eventCardMapper } from '../util/eventCard.mapper';

const EventMiniListing = ({ events, listingPagePath, title }) => {
  if (!events || events.length < 1) return null;
  return (
    <EventMiniListingStyled data-testid="eventList">
      <div className="emlHeader">
        <h1 className="emlTitle">{title}</h1>
        {listingPagePath && (
          <a
            className="emlListingLink"
            data-testid="listingPageLink"
            href={listingPagePath}
          >
            View all events
          </a>
        )}
      </div>
      <div className="emlWrap">
        <div className="emlFeatured">
          <div className="emlColumnPadding">
            <FeaturedEventCard {...eventCardMapper(events[0])} />
          </div>
        </div>
        <div className="emlList">
          <div className="emlColumnPadding">
            {events.splice(1, 3).map((event, idx) => {
              const props = eventCardMapper(event);
              return (
                <div className="emlItem" key={idx}>
                  <EventCard {...props} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </EventMiniListingStyled>
  );
};

EventMiniListing.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),
  listingPagePath: PropTypes.string,
  title: PropTypes.string,
};

export default EventMiniListing;
