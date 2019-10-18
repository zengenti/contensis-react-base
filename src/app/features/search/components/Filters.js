import React from 'react';
import PropTypes from 'prop-types';

import FiltersStyled from '../components.styled/Filters.styled';

const Filters = ({
  className,
  currentFacet,
  filters,
  updateSelectedFilters,
}) => {
  if (!filters || Object.keys(filters).length < 1) return null;
  return (
    <FiltersStyled className={className}>
      {Object.keys(filters).map((fkey, idx) => (
        <React.Fragment key={idx}>
          <h2 className="filtersTitle">{filters[fkey].title}</h2>
          <ul className="filterList">
            {filters[fkey].items.map((filter, ikey) => {
              const id = ''; //filter.title.replace(' ', '').toLowerCase() + ikey;
              return (
                <li key={currentFacet + ikey} className="filterItem">
                  <input
                    type="checkbox"
                    id={id}
                    defaultChecked={filter.isSelected}
                    onClick={() => updateSelectedFilters(fkey, filter.key)}
                  />
                  <label htmlFor={id} className="filterLabel">
                    {filter.title}
                  </label>
                </li>
              );
            })}
          </ul>
        </React.Fragment>
      ))}
    </FiltersStyled>
  );
};

Filters.propTypes = {
  className: PropTypes.string,
  currentFacet: PropTypes.string,
  filters: PropTypes.object,
  updateSelectedFilters: PropTypes.func,
};

export default Filters;
