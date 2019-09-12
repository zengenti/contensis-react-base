import React from 'react';
import { render, renderer } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';

// to be replaced with actual component (any reference to <Component> will need to be updates)
import Component from '../Component';

// dummy props, they may not be exactly the same as the component so may need to be changed to suit content model etc.
const props = {
  image: 'https://picsum.photos/id/29/500/500',
  title: 'News title can span multiple lines',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
};

test('image is displayed', () => {
  const newsCard = renderer.create(<Component image={props.image} />).toJSON();
  expect(newsCard).toHaveStyleRule('background-image', `url(${props.image})`);
});

test('title is displayed', () => {
  const { getByTestId } = render(<Component image={props.title} />);
  expect(getByTestId('title')).toBe(props.title);
});

test('description is displayed', () => {
  const { getByTestId } = render(<Component image={props.description} />);
  expect(getByTestId('description')).toBe(props.description);
});

test('date is displayed', () => {
  const date = '2018-03-12T00:00:00';
  const { getByTestId } = render(<Component date={date} />);

  expect(getByTestId('dateDay')).toBe('12');
  expect(getByTestId('dateMonth')).toBe('March');
  expect(getByTestId('dateYear')).toBe('2018');
});
