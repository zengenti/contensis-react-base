import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';

// to be replaced with actual component (any reference to <Component> will need to be updates)
import NewsCard from '../components/NewsCard';

// dummy props, they may not be exactly the same as the component so may need to be changed to suit content model etc.
const props = {
  image: 'https://picsum.photos/id/29/500/500',
  imageAlt: 'This is a test',
  title: 'News title can span multiple lines',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
};

test('title is displayed', () => {
  const { getByTestId } = render(<NewsCard title={props.title} />);
  expect(getByTestId('title')).toHaveTextContent(props.title);
});

test('description is displayed', () => {
  const { getByTestId } = render(<NewsCard description={props.description} />);
  expect(getByTestId('description')).toHaveTextContent(props.description);
});

test('image is displayed', () => {
  const { getByTestId } = render(<NewsCard image={props.image} />);
  const cardImageComponent = getByTestId('card');
  const image = cardImageComponent.querySelector('img');

  expect(image).not.toBeNull;
  expect(image.getAttribute(['src'])).toBe(props.image);
});

test('image has alt text', () => {
  const { getByTestId } = render(
    <NewsCard image={props.image} imageAlt={props.imageAlt} />
  );
  const cardImageComponent = getByTestId('card');
  const image = cardImageComponent.querySelector('img');

  expect(image).not.toBeNull;
  expect(image.getAttribute(['alt'])).toBe(props.imageAlt);
});

test('date is displayed', () => {
  const date = '2018-03-12T00:00:00';
  const { getByTestId } = render(<NewsCard date={date} />);
  expect(getByTestId('date')).toHaveTextContent('12 March 2018');
});
