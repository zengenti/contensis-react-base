import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Filters from '../components/Filters';

import { filterGroup } from './data.mock';

let filters = [];

for (let i = 0; i < 3; i++) {
  filters.push(filterGroup);
}

test('if array is empty then no filter groups rendered', () => {
  const { queryByTestId } = render(<Filters filterGroups={[]} />);

  expect(queryByTestId('filters')).toBe(null);
});

test('if array is > 1 then groups are rendered', () => {
  const { queryByTestId, queryAllByTestId } = render(
    <Filters filterGroups={filters} />
  );

  expect(queryByTestId('filters')).not.toBe(null);
  expect(queryAllByTestId('filterGroup').length).toBe(filters.length);
});

test('if clear filters is selected then action is dispatched', () => {
  let actionDispatched = false;
  const { queryByTestId } = render(
    <Filters
      filterGroups={filters}
      clearAllFilters={() => {
        actionDispatched = !actionDispatched;
      }}
    />
  );

  expect(actionDispatched).toBe(false);

  fireEvent.click(queryByTestId('clearAllFilters'));

  expect(actionDispatched).toBe(true);
});

test('if toggle filters visibility button is selected then action is dispatched', () => {
  let actionDispatched = false;
  const { queryByTestId } = render(
    <Filters
      filterGroups={filters}
      toggleIsOpen={() => {
        actionDispatched = !actionDispatched;
      }}
    />
  );

  expect(actionDispatched).toBe(false);

  fireEvent.click(queryByTestId('toggleFiltersVisibility'));

  expect(actionDispatched).toBe(true);
});
