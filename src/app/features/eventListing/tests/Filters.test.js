import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Filters from '../components/Filters';

import { filterGroup } from './data.mock';

let filters = [];

for (let i = 0; i < 3; i++) {
  filters.push(filterGroup);
}

test('if array is empty then no filter groups rendered', () => {
  const { queryByTestId } = render(
    <Filters filterGroups={[]} update={() => {}} />
  );

  expect(queryByTestId('filters')).toBe(null);
});

test('if array is > 1 then groups are rendered', () => {
  const { queryByTestId, queryAllByTestId } = render(
    <Filters filterGroups={filters} update={() => {}} />
  );

  expect(queryByTestId('filters')).not.toBe(null);
  expect(queryAllByTestId('filterGroup').length).toBe(filters.length);
});
