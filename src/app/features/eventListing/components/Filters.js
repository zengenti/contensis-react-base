import React from 'react';
import PropTypes from 'prop-types';

import FilterGroup from './FilterGroup';

const Filters = ({ filterGroups, update }) => {
  if (!filterGroups || filterGroups.length < 1) return null;

  return (
    <div data-testid="filters">
      {filterGroups.map((group, idx) => {
        return <FilterGroup {...group} update={update} key={idx} />;
      })}
    </div>
  );
};

Filters.propTypes = {
  filterGroups: PropTypes.arrayOf(PropTypes.object),
  update: PropTypes.func,
};

export default Filters;
