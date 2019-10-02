import React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';

import EventMiniListing from '../components/EventMiniListing';

import { entry } from '../tests/data.mock';

storiesOf('Features', module).add(
  'Event Mini Listing',
  withState({
    activeDate: '2019-12-01T00:00:00',
    filtersIsOpen: false,
    monthsIsOpen: false,
  })(
    ({ store }) => {
      let props = {
        events: [],
        listingPagePath: '/path-to-page',
        title: 'Upcoming Events',
      };

      for (let i = 0; i < 10; i++) {
        props.events.push(entry);
      }

      return <EventMiniListing {...props} {...store.state} />;
    },
    {
      knobs: {
        escapeHTML: false,
      },
    }
  )
);
