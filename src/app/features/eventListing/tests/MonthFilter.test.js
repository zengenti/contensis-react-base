import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import MonthFilter from '../components/MonthFilter';

//set default props to pass to component render <FeaturedEventCard {...props} />
//to override a default value: <FeaturedEventCard {...props} title="new title"/>
const props = {
  currentDate: '2019-08-03T00:00:00',
  activeDate: '2019-12-01T00:00:00',
};

test('the current date month is the first filter option', () => {
  const { queryAllByTestId } = render(<MonthFilter {...props} />);

  expect(queryAllByTestId('filterOption')[0]).toHaveTextContent('August');
});

test('the active filtered month has and active state and is not selectable', () => {
  const { queryAllByTestId } = render(<MonthFilter {...props} />);
  const active = queryAllByTestId('filterOption').find(x =>
    x.classList.contains('active')
  );

  expect(active).toHaveTextContent('December');
  expect(active).toHaveAttribute('disabled');
});

test('if the month value is "January" then the year is also displayed as the filter label', () => {
  const { queryAllByTestId } = render(<MonthFilter {...props} />);
  const january = queryAllByTestId('filterOption').find(x =>
    x.textContent.startsWith('January')
  );

  expect(january).toHaveTextContent('January 2020');
});

test('next 10 months filter options are visible', () => {
  const { queryAllByTestId } = render(<MonthFilter {...props} />);
  const expectedValues = [
    'August',
    'September',
    'October',
    'November',
    'December',
    'January 2020',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];
  queryAllByTestId('filterOption').map((filter, idx) => {
    expect(filter.textContent).toBe(expectedValues[idx]);
  });
});

test('when a users selects a month filter option then update the active month filter and dispatch an action to update state', () => {
  //set active date from props
  //this is what will update on click and be passed on rerender
  //we also check that the date passed as param to updateActiveMonth is as expected
  let activeDate = props.activeDate;

  //function to trigger on click event to update active date
  const updateActiveMonth = newDate => {
    activeDate = newDate;
  };

  const { getByText, queryAllByTestId, rerender } = render(
    <MonthFilter {...props} updateActiveMonth={updateActiveMonth} />
  );

  const expectedValues = [
    {
      month: 'August',
      isoDate: '2019-08-01T00:00:00',
    },
    {
      month: 'September',
      isoDate: '2019-09-01T00:00:00',
    },
    {
      month: 'October',
      isoDate: '2019-10-01T00:00:00',
    },
    {
      month: 'November',
      isoDate: '2019-11-01T00:00:00',
    },
    {
      month: 'December',
      isoDate: '2019-12-01T00:00:00',
    },
    {
      month: 'January',
      isoDate: '2020-01-01T00:00:00',
    },
    {
      month: 'February',
      isoDate: '2020-02-01T00:00:00',
    },
    {
      month: 'March',
      isoDate: '2020-03-01T00:00:00',
    },
    {
      month: 'April',
      isoDate: '2020-04-01T00:00:00',
    },
    {
      month: 'May',
      isoDate: '2020-05-01T00:00:00',
    },
    {
      month: 'June',
      isoDate: '2020-06-01T00:00:00',
    },
  ];

  //loop through expected values array and trigger a component rerender
  //when the {filter.month} button is clicked
  expectedValues.map(filter => {
    //trigger a click on {filter.month} filter option
    //then rerender the component with updated props
    var regex = new RegExp(`${filter.month}`);
    fireEvent.click(getByText(regex));

    rerender(
      <MonthFilter
        {...props}
        updateActiveMonth={updateActiveMonth}
        activeDate={activeDate}
      />
    );

    const active = queryAllByTestId('filterOption').find(x =>
      x.classList.contains('active')
    );

    expect(active).toHaveTextContent(regex);
    expect(active).toHaveAttribute('disabled');
    expect(activeDate).toBe(filter.isoDate);
  });
});
