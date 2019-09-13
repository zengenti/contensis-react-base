import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

import NewsCard from '../components/NewsCard';

storiesOf('News Listing', module)
  .addParameters({ jest: ['NewsCard'] })
  .add('News Card', () => {
    const props = {
      image: 'https://picsum.photos/id/29/500/500',
      // imageAlt: 'This is a test',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      date: '2018-03-12T00:00:00',
    };

    return (
      <NewsCard
        title={text('Title', 'News title can span multiple lines')}
        {...props}
      />
    );
  });
