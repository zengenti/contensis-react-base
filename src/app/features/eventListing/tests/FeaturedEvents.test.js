import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import FeaturedEvents from '../components/FeaturedEvents';

import { entry } from './data.mock';

//set default props to pass to component render <FeaturedEvents {...props} />
//to override a default value: <FeaturedEvents {...props} title="new title"/>
let eventsArr = [];

for (let i = 0; i < 3; i++) {
  eventsArr.push(entry);
}

const props = {
  events: eventsArr,
};

test('if no events or events prop is null then do not render component', () => {
  const { queryByTestId, rerender } = render(
    <FeaturedEvents {...props} events={[]} />
  );
  expect(queryByTestId('featuredEvents')).toBeNull();

  //events is null
  rerender(<FeaturedEvents {...props} events={null} />);
  expect(queryByTestId('featuredEvents')).toBeNull();
});

test('maximum 3 featured events are rendered', () => {
  let eventsList = props.events;
  eventsList.push(entry);

  const { queryAllByTestId } = render(
    <FeaturedEvents {...props} events={eventsList} />
  );

  expect(queryAllByTestId('eventCard')).toHaveLength(3);
});

test('if less than 3 events then only render relevant count', () => {
  let eventsList = props.events;
  eventsList = eventsList.slice(0, 2);

  const { queryAllByTestId } = render(
    <FeaturedEvents {...props} events={eventsList} />
  );

  expect(queryAllByTestId('eventCard')).toHaveLength(2);
});
