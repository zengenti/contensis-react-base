import React from 'react';
import { storiesOf } from '@storybook/react';

import EventCard from '../components/EventCard';

storiesOf('Features', module).add(
  'Content Page',
  () => {
    const props = {
      date: '2018-03-12T00:00:00',
      description: 'This is a description',
      location: 'Location',
      title: 'This is a title',
      uri: '/path-to-page',
    };

    return <EventCard {...props} />;
  },
  {
    knobs: {
      escapeHTML: false,
    },
  }
);
