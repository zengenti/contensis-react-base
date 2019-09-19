import React from 'react';
import { storiesOf } from '@storybook/react';

import EventListing from '../components/EventListing';

import { entry, filterGroup } from '../tests/data.mock';

storiesOf('Features', module).add(
  'Event Listing',
  () => {
    let props = {
      activeDate: '2019-12-01T00:00:00',
      currentDate: '2019-08-03T00:00:00',
      events: [],
      featuredEvents: [],
      filters: [],
      message: 'No results found',
      title: 'Upcoming Events',
      updateActiveMonth: () => {},
      updateFilters: () => {},
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

    return <EventListing {...props} />;
  },
  {
    knobs: {
      escapeHTML: false,
    },
  }
);
