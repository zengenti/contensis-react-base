import React from 'react';
import PropTypes from 'prop-types';

import EventList from './EventList';
import FeaturedEvents from './FeaturedEvents';
import MonthFilter from './MonthFilter';
import Filters from './Filters';

import EventListingStyled from '../components.styled/EventListing.styled';

const EventListing = ({
  activeDate,
  currentDate,
  events,
  featuredEvents,
  filters,
  message,
  title,
  updateActiveMonth,
  updateFilters,
}) => {
  return (
    <EventListingStyled>
      <h1>{title}</h1>
      <FeaturedEvents events={featuredEvents} />
      <MonthFilter
        activeDate={activeDate}
        currentDate={currentDate}
        updateActiveMonth={updateActiveMonth}
      />
      <div className="feWrap">
        <div className="feFilters">
          <div className="feColumnPadding">
            <Filters filterGroups={filters} update={updateFilters} />
          </div>
        </div>
        <div className="feList">
          <div className="feColumnPadding">
            <EventList events={events} message={message} />
          </div>
        </div>
      </div>
    </EventListingStyled>
  );
};

EventListing.propTypes = {
  activeDate: PropTypes.string,
  currentDate: PropTypes.string,
  events: PropTypes.arrayOf(PropTypes.object),
  featuredEvents: PropTypes.arrayOf(PropTypes.object),
  filters: PropTypes.arrayOf(PropTypes.object),
  message: PropTypes.string,
  title: PropTypes.string,
  updateActiveMonth: PropTypes.func,
  updateFilters: PropTypes.func,
};

export default EventListing;
