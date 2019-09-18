import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import EventList from '../components/EventList';

import { entry } from './data.mock';

//set default props to pass to component render <EventList {...props} />
//to override a default value: <EventList {...props} title="new title"/>

let eventsArr = [];

for (let i = 0; i < 10; i++) {
  eventsArr.push(entry);
}

const props = {
  events: eventsArr,
  message: 'No results found',
};

test('if no events or events prop is null then render no results message', () => {
  //events count is 0
  const { queryByTestId, rerender } = render(
    <EventList {...props} events={[]} />
  );
  expect(queryByTestId('eventList')).toBeNull();
  expect(queryByTestId('noResultsMessage')).toHaveTextContent(props.message);

  //events is null
  rerender(<EventList {...props} events={null} />);
  expect(queryByTestId('eventList')).toBeNull();
  expect(queryByTestId('noResultsMessage')).toHaveTextContent(props.message);
});

test('if events count > 1 then render list of event cards', () => {
  const { queryAllByTestId } = render(<EventList {...props} />);

  expect(queryAllByTestId('eventCard')).toHaveLength(props.events.length);
});
