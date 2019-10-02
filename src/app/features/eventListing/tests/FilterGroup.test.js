import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import FilterGroup from '../components/FilterGroup';

import { filterGroup } from './data.mock';

test('if filter group options count < 1 then do not render the filter group', () => {
  const { queryByTestId } = render(
    <FilterGroup title="Filter Group" options={[]} update={() => {}} />
  );

  expect(queryByTestId('filterGroup')).toBe(null);
});

test('if filter group options count > 0 then render the filter group', () => {
  const { queryByTestId, queryAllByTestId } = render(
    <FilterGroup {...filterGroup} update={() => {}} />
  );

  expect(queryByTestId('filterGroup')).not.toBe(null);
  expect(queryAllByTestId('filterOption').length).toBe(
    filterGroup.options.length
  );
});

test('group title is rendered', () => {
  const { queryByTestId } = render(
    <FilterGroup {...filterGroup} update={() => {}} />
  );

  expect(queryByTestId('title')).toHaveTextContent(filterGroup.title);
});

test('filter option is visible and label is as expected', () => {
  const { queryAllByTestId } = render(
    <FilterGroup {...filterGroup} update={() => {}} />
  );
  const filterOptions = queryAllByTestId('filterOption');

  filterGroup.options.map((option, idx) => {
    const fOption = filterOptions[idx];
    const id = fOption.querySelector('input').getAttribute('id');
    //check label text
    expect(fOption.querySelector('label')).toHaveTextContent(option.title);
    //check label is linked to input via 'for' attribute
    expect(fOption.querySelector('label').getAttribute('for')).toBe(id);
    //check input value
    expect(fOption.querySelector('input').value).toBe(option.id);
  });
});

test('if filter option is selected then checked attribute is present else checked attribute is not present', () => {
  const { queryAllByTestId } = render(
    <FilterGroup {...filterGroup} update={() => {}} />
  );
  const filterOptions = queryAllByTestId('filterOption');

  filterGroup.options.map((option, idx) => {
    const fOption = filterOptions[idx];
    if (option.isSelected) {
      expect(fOption.querySelector('input')).toHaveAttribute('checked');
    } else {
      expect(fOption.querySelector('input')).not.toHaveAttribute('checked');
    }
  });
});

test('when user selects filter option toggle checked attribute, then dispatch action to update state', () => {
  let updatedFilterGroup = { ...filterGroup };
  let filterGroupId = updatedFilterGroup.id;
  let selectedFilterId = null;

  const toggleFilter = (groupId, id) => {
    filterGroupId = groupId;
    selectedFilterId = id;
  };

  const { queryAllByTestId, rerender } = render(
    <FilterGroup {...updatedFilterGroup} update={toggleFilter} />
  );

  const filterOptions = queryAllByTestId('filterOption');

  filterGroup.options.map((option, idx) => {
    const fOption = filterOptions[idx];
    const originalState = option.isSelected;

    fireEvent.click(fOption.querySelector('input'));

    //get the index of the selected filter
    //using the id passed to the update function for extra redundancy
    const optionIndex = updatedFilterGroup.options.findIndex(
      x => x.id == selectedFilterId
    );

    //toggle isSelected value
    updatedFilterGroup.options[optionIndex].isSelected = !updatedFilterGroup
      .options[optionIndex].isSelected;

    //rerender component with updated props
    rerender(<FilterGroup {...updatedFilterGroup} update={toggleFilter} />);

    //check that isSelected boolean has changed
    if (originalState) {
      expect(fOption.querySelector('input')).not.toHaveAttribute('checked');
    } else {
      expect(fOption.querySelector('input')).toHaveAttribute('checked');
    }

    //check the filter id passed to the dispatch function is correct
    expect(selectedFilterId).toBe(option.id);
    //check the filter group id passed to the dispatch function is correct
    expect(filterGroupId).toBe(updatedFilterGroup.id);
  });
});

//list group

//test('if array is empty then no filter groups rendered', () => {});

//test('if array is > 1 then groups are rendered', () => {});
