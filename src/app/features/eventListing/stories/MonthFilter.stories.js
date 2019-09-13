import React from 'react';
import { storiesOf } from '@storybook/react';

import MonthFilter from '../components/MonthFilter';

storiesOf('Event Listing', module).add(
  'Month Filter',
  () => {
    const props = {
      currentDate: '2019-08-03T00:00:00',
      activeDate: '2019-12-01T00:00:00',
    };

    return <MonthFilter {...props} />;
  },
  {
    knobs: {
      escapeHTML: false,
    },
  }
);
