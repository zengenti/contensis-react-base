import React from 'react';
import { storiesOf } from '@storybook/react';

import FeaturedEventCard from '../components/FeaturedEventCard';

storiesOf('Event Listing', module).add(
  'Featured Event Card',
  () => {
    const props = {
      date: '2018-03-12T00:00:00',
      imageAlt: 'image alt text',
      imagePath: '/path-to-image/image-name.jpg',
      title: 'This is a title',
      uri: '/path-to-page',
    };

    return <FeaturedEventCard {...props} />;
  },
  {
    knobs: {
      escapeHTML: false,
    },
  }
);
