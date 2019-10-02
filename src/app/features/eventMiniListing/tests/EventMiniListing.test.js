import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import EventMiniListing from '../components/EventMiniListing';

import { entry } from './data.mock';

//set default props to pass to component render <EventList {...props} />
//to override a default value: <EventList {...props} title="new title"/>

let eventsArr = [];

for (let i = 0; i < 4; i++) {
  eventsArr.push(entry);
}

const props = {
  events: eventsArr,
  listingPagePath: '/path-to-page',
};

test('if no events or events prop is null then render no results message', () => {
  //events count is 0
  const { queryByTestId, rerender } = render(
    <EventMiniListing {...props} events={[]} />
  );
  expect(queryByTestId('eventList')).toBeNull();

  //events is null
  rerender(<EventMiniListing {...props} events={null} />);
  expect(queryByTestId('eventList')).toBeNull();
});

test('if events count > 1 then render list of event cards', () => {
  const count = props.events.length;
  const { queryAllByTestId } = render(<EventMiniListing {...props} />);

  expect(queryAllByTestId('eventCard')).toHaveLength(count);
});

test('if no listing page path is present then do not render link to listing page', () => {
  const { queryByTestId } = render(
    <EventMiniListing {...props} listingPagePath={''} />
  );
  expect(queryByTestId('listingPageLink')).toBeNull();
});

test('if listing page path is present the render link to listing page', () => {
  const { queryByTestId } = render(<EventMiniListing {...props} />);
  expect(queryByTestId('listingPageLink')).not.toBeNull();
  expect(queryByTestId('listingPageLink').getAttribute('href')).toBe(
    props.listingPagePath
  );
});
