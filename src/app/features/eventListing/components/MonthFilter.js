import React from 'react';
import PropTypes from 'prop-types';

import MonthFilter from '../components.styled/MonthFilter.styled';

import formatDate from '../util/formatDate';

const FeaturedEventCard = ({ activeDate, currentDate, updateActiveMonth }) => {
  let missingProp = false;
  [activeDate, currentDate].map(prop => {
    if (!prop || prop == '') missingProp = true;
  });
  if (missingProp) return null;
  const currentYear = formatDate(currentDate, 'yyyy');
  const nextYear = parseInt(currentYear) + 1;

  const currentMonthInt = parseInt(formatDate(currentDate, 'M')) - 1;

  const activeMonth = formatDate(activeDate, 'MMMM');

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const filters = [];
  let filterMonthInt = currentMonthInt;
  for (let i = 0; i < 11; i++) {
    if (filterMonthInt == 12) filterMonthInt = 0;
    filters.push({
      month: months[filterMonthInt],
      int: filterMonthInt,
      year: filterMonthInt < currentMonthInt ? nextYear : currentYear,
    });
    filterMonthInt++;
  }
  return (
    <MonthFilter>
      {filters.map((filter, idx) => {
        const filterClass = filter.month == activeMonth ? 'active' : '';
        const disabled = filter.month == activeMonth && true;

        //add preceding 0 to month int for iso date
        //add 1 to filter.int as the array was zero indexed
        const monthInt =
          filter.int + 1 < 10 ? `0${filter.int + 1}` : filter.int + 1;

        return (
          <button
            key={idx}
            data-testid="filterOption"
            className={`mfButton ${filterClass}`}
            disabled={disabled}
            onClick={() => {
              updateActiveMonth(`${filter.year}-${monthInt}-01T00:00:00`);
            }}
          >
            {filter.month}
            {filter.month == 'January' && ` ${filter.year}`}
          </button>
        );
      })}
    </MonthFilter>
  );
};

FeaturedEventCard.propTypes = {
  activeDate: PropTypes.string,
  currentDate: PropTypes.string,
  updateActiveMonth: PropTypes.func,
};

export default FeaturedEventCard;
