import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import EventCard from '../components/EventCard';

const props = {
  date: '2018-03-12T00:00:00',
  description: 'This is a description',
  location: 'Location',
  title: 'This is a title',
  uri: '/path-to-page',
};

test('if a required prop is null then do not render component', () => {
  const { queryByTestId, rerender } = render(<EventCard {...props} />);
  expect(queryByTestId('eventCard')).not.toBeNull();

  //date is null or empty
  rerender(<EventCard {...props} date={null} />);
  expect(queryByTestId('eventCard')).toBeNull();

  //description is null or empty
  rerender(<EventCard {...props} description={''} />);
  expect(queryByTestId('eventCard')).toBeNull();

  //location is null or empty
  rerender(<EventCard {...props} location={''} />);
  expect(queryByTestId('eventCard')).toBeNull();

  //title is null or empty
  rerender(<EventCard {...props} title={''} />);
  expect(queryByTestId('eventCard')).toBeNull();

  //uri is null or empty
  rerender(<EventCard {...props} title={''} />);
  expect(queryByTestId('eventCard')).toBeNull();
});

test('date is displayed', () => {
  const date = '2018-03-12T00:00:00';
  const { getByTestId } = render(<EventCard {...props} date={date} />);

  expect(getByTestId('dateDay')).toHaveTextContent('12');
  expect(getByTestId('dateMonth')).toHaveTextContent('Mar');
});

test('single digit date is displayed with preceeding 0', () => {
  const date = '2015-03-02T00:00:00';
  const { getByTestId } = render(<EventCard {...props} date={date} />);

  expect(getByTestId('dateDay')).toHaveTextContent('02');
  expect(getByTestId('dateMonth')).toHaveTextContent('Mar');
});

test('description is displayed', () => {
  const { getByTestId } = render(<EventCard {...props} />);

  expect(getByTestId('description')).toHaveTextContent(props.description);
});

test('location is displayed', () => {
  const { getByTestId } = render(<EventCard {...props} />);

  expect(getByTestId('location')).toHaveTextContent(props.location);
});

test('title is displayed', () => {
  const { getByTestId } = render(<EventCard {...props} />);

  expect(getByTestId('title')).toHaveTextContent(props.title);
});

test('uri prop has a value then wrap title in <a> tag', () => {
  const { getByTestId } = render(<EventCard {...props} />);
  const compTitle = getByTestId('title');
  const compLink = compTitle.querySelector('a');

  //check that the a tag is present
  expect(compLink).not.toBeNull;
  //check that href of a tag is the uri
  expect(compLink.getAttribute(['href'])).toBe(props.uri);
});
