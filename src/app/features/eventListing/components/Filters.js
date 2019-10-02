import React from 'react';
import PropTypes from 'prop-types';

import FilterGroup from './FilterGroup';
import ButtonStyled from '../components.styled/Button.styled';
import FiltersStyled from '../components.styled/Filters.styled';

const Filters = ({
  clearAllFilters,
  filterGroups,
  isOpen,
  toggleIsOpen,
  update,
}) => {
  if (!filterGroups || filterGroups.length < 1) return null;

  return (
    <FiltersStyled data-testid="filters" isOpen={isOpen}>
      <div className="fToggleWrap">
        <ButtonStyled
          className="fToggle"
          data-testid="toggleFiltersVisibility"
          onClick={() => toggleIsOpen()}
        >
          Filters
        </ButtonStyled>
      </div>

      <div className="filters">
        <button
          className="fClear"
          data-testid="clearAllFilters"
          onClick={() => clearAllFilters()}
        >
          Clear all filters
        </button>
        {filterGroups.map((group, idx) => {
          return <FilterGroup {...group} update={update} key={idx} />;
        })}
      </div>
    </FiltersStyled>
  );
};

Filters.propTypes = {
  clearAllFilters: PropTypes.func,
  filterGroups: PropTypes.arrayOf(PropTypes.object),
  isOpen: PropTypes.bool,
  toggleIsOpen: PropTypes.func,
  update: PropTypes.func,
};

export default Filters;
