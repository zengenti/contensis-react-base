import React from 'react';
import PropTypes from 'prop-types';

import EventList from './EventList';
import FeaturedEvents from './FeaturedEvents';
import MonthFilter from './MonthFilter';
import Filters from './Filters';

import EventListingStyled from '../components.styled/EventListing.styled';

class EventListing extends React.Component {
  static propTypes = {
    activeDate: PropTypes.string,
    clearAllFilters: PropTypes.func,
    currentDate: PropTypes.string,
    events: PropTypes.arrayOf(PropTypes.object),
    featuredEvents: PropTypes.arrayOf(PropTypes.object),
    filters: PropTypes.arrayOf(PropTypes.object),
    message: PropTypes.string,
    title: PropTypes.string,
    updateActiveMonth: PropTypes.func,
    updateFilters: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      filtersIsOpen: false,
      monthsIsOpen: false,
    };
  }

  toggleFiltersIsOpen = () => {
    this.setState(state => {
      let newState = { ...state };
      newState.filtersIsOpen = !state.filtersIsOpen;
      if (typeof window !== 'undefined' && window.outerWidth >= 550) {
        newState.monthsIsOpen = false;
      }
      return newState;
    });
  };

  toggleMonthsIsOpen = () => {
    this.setState(state => {
      let newState = { ...state };
      newState.monthsIsOpen = !state.monthsIsOpen;
      if (typeof window !== 'undefined' && window.outerWidth >= 550) {
        newState.filtersIsOpen = false;
      }
      return newState;
    });
  };

  render() {
    const {
      activeDate,
      clearAllFilters,
      currentDate,
      events,
      featuredEvents,
      filters,
      message,
      title,
      updateActiveMonth,
      updateFilters,
    } = this.props;

    return (
      <EventListingStyled>
        <h1>{title}</h1>
        <FeaturedEvents events={featuredEvents} />
        <MonthFilter
          activeDate={activeDate}
          currentDate={currentDate}
          isOpen={this.state.monthsIsOpen}
          toggleIsOpen={this.toggleMonthsIsOpen}
          updateActiveMonth={updateActiveMonth}
        />
        <div className="feWrap">
          <div className="feFilters">
            <div className="feColumnPadding">
              <Filters
                clearAllFilters={clearAllFilters}
                filterGroups={filters}
                isOpen={this.state.filtersIsOpen}
                toggleIsOpen={this.toggleFiltersIsOpen}
                update={updateFilters}
              />
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
  }
}

export default EventListing;
