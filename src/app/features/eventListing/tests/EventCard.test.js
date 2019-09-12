import React from 'react';
import { render, rerender } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Component from '../Component';

const props = {
  description: 'This is a description',
  location: 'Location',
  title: 'This is a title',
  uri: '/path-to-page',
};

test('if a required prop is null then do not render component', () => {
  const date = '2018-03-12T00:00:00';

  const { getByTestId } = render(<Component {...props} date={date} />);
  expect(getByTestId('component')).not.toBeNull();

  //date is null or empty
  rerender(<Component {...props} date={null} />);
  expect(getByTestId('component')).toBeNull();

  //description is null or empty
  rerender(<Component {...props} date={date} description={''} />);
  expect(getByTestId('component')).toBeNull();

  //location is null or empty
  rerender(<Component {...props} date={date} location={''} />);
  expect(getByTestId('component')).toBeNull();

  //title is null or empty
  rerender(<Component {...props} date={date} title={''} />);
  expect(getByTestId('component')).toBeNull();

  //uri is null or empty
  rerender(<Component {...props} date={date} title={''} />);
  expect(getByTestId('component')).toBeNull();
});

test('date is displayed', () => {
  const date = '2018-03-12T00:00:00';
  const { getByTestId } = render(<Component date={date} />);

  expect(getByTestId('dateDay')).toBe('12');
  expect(getByTestId('dateMonth')).toBe('Mar');
});

test('single digit date is displayed with preceeding 0', () => {
  const date = '2015-03-02T00:00:00';
  const { getByTestId } = render(<Component date={date} />);

  expect(getByTestId('dateDay')).toBe('02');
  expect(getByTestId('dateMonth')).toBe('Mar');
});

test('description is displayed', () => {
  const { getByTestId } = render(<Component description={props.description} />);

  expect(getByTestId('description')).toBe(props.description);
});

test('location is displayed', () => {
  const { getByTestId } = render(<Component location={props.location} />);

  expect(getByTestId('location')).toBe(props.location);
});

test('title is displayed', () => {
  const { getByTestId } = render(<Component title={props.title} />);

  expect(getByTestId('title')).toBe(props.title);
});

test('uri prop has a value then wrap title in <a> tag', () => {
  const { getByTestId } = render(
    <Component title={props.title} uri={props.uri} />
  );
  const compTitle = getByTestId('title');
  const compLink = compTitle.find('a');

  //check that the a tag is present
  expect(compLink).not.toBeNull();
  //check that href of a tag is the uri
  expect(compLink.find(['href'])).toBe(props.uri);
});
