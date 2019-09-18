import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import FeaturedEventCard from '../components/FeaturedEventCard';

import { entry } from './data.mock';
import { eventCardMapper } from '../util/eventCard.mapper';

//set default props to pass to component render <FeaturedEventCard {...props} />
//to override a default value: <FeaturedEventCard {...props} title="new title"/>
const props = eventCardMapper(entry);

test('if a required prop is null then do not render component', () => {
  const { queryByTestId, rerender } = render(<FeaturedEventCard {...props} />);
  expect(queryByTestId('eventCard')).not.toBeNull();

  //date is null or empty
  rerender(<FeaturedEventCard {...props} date={null} />);
  expect(queryByTestId('eventCard')).toBeNull();

  //imageAlt is null or empty
  rerender(<FeaturedEventCard {...props} imageAlt={''} />);
  expect(queryByTestId('eventCard')).toBeNull();

  //imagePath is null or empty
  rerender(<FeaturedEventCard {...props} imagePath={''} />);
  expect(queryByTestId('eventCard')).toBeNull();

  //title is null or empty
  rerender(<FeaturedEventCard {...props} title={''} />);
  expect(queryByTestId('eventCard')).toBeNull();

  //uri is null or empty
  rerender(<FeaturedEventCard {...props} title={''} />);
  expect(queryByTestId('eventCard')).toBeNull();
});

test('date is displayed', () => {
  const date = '2018-03-12T00:00:00';
  const { getByTestId } = render(<FeaturedEventCard {...props} date={date} />);

  expect(getByTestId('dateDay')).toHaveTextContent('12');
  expect(getByTestId('dateMonth')).toHaveTextContent('Mar');
});

test('single digit date is displayed with preceeding 0', () => {
  const date = '2015-03-02T00:00:00';
  const { getByTestId } = render(<FeaturedEventCard {...props} date={date} />);

  expect(getByTestId('dateDay')).toHaveTextContent('02');
  expect(getByTestId('dateMonth')).toHaveTextContent('Mar');
});

test('image alt text is displayed', () => {
  const { getByTestId } = render(<FeaturedEventCard {...props} />);

  expect(getByTestId('image').getAttribute(['alt'])).toBe(props.imageAlt);
});

test('image is displayed', () => {
  const { getByTestId } = render(<FeaturedEventCard {...props} />);

  expect(getByTestId('image').getAttribute(['src'])).toBe(props.imagePath);
});

test('title is displayed', () => {
  const { getByTestId } = render(<FeaturedEventCard {...props} />);

  expect(getByTestId('title')).toHaveTextContent(props.title);
});

test('uri prop is passed to "href" value', () => {
  const { getByTestId } = render(<FeaturedEventCard {...props} />);

  //check that href of a tag is the uri
  expect(getByTestId('eventCard').getAttribute(['href'])).toBe(props.uri);
});
