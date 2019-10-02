import React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';

import EventListing from '../components/EventListing';

import { entry, filterGroup } from '../tests/data.mock';

storiesOf('Features', module).add(
  'Event Listing',
  withState({
    activeDate: '2019-12-01T00:00:00',
    filtersIsOpen: false,
    monthsIsOpen: false,
  })(
    ({ store }) => {
      let props = {
        currentDate: '2019-08-03T00:00:00',
        events: [],
        featuredEvents: [],
        filters: [],
        message: 'No results found',
        title: 'Upcoming Events',
      };

      for (let i = 0; i < 3; i++) {
        props.filters.push(filterGroup);
      }

      for (let i = 0; i < 10; i++) {
        props.events.push(entry);
      }

      for (let i = 0; i < 3; i++) {
        let fEntry = entry;
        fEntry.image = {
          asset: {
            sys: {
              uri: 'https://picsum.photos/400/625',
            },
          },
          altText: 'Image from Picsum',
        };
        props.featuredEvents.push(fEntry);
      }

      const clearAllFilters = () => {};

      const updateActiveMonth = newDate => {
        store.set({ activeDate: newDate });
      };

      const updateFilters = () => {};

      return (
        <EventListing
          {...props}
          {...store.state}
          clearAllFilters={clearAllFilters}
          updateActiveMonth={updateActiveMonth}
          updateFilters={updateFilters}
        />
      );
    },
    {
      knobs: {
        escapeHTML: false,
      },
    }
  )
);
