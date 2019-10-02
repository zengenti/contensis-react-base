import React from 'react';
import PropTypes from 'prop-types';

import FilterGroupStyled from '../components.styled/FilterGroup.styled';

const FilterGroup = ({ id, options, title, update }) => {
  if (!options || options.length < 1) return null;

  return (
    <FilterGroupStyled data-testid="filterGroup">
      <h3 className="fgTitle" data-testid="title">
        {title}
      </h3>

      {options.map((option, idx) => {
        let filterId = `${option.title}-${idx}`.replace(/ /g, '-');

        return (
          <div className="fgOption" data-testid="filterOption" key={filterId}>
            <input
              className="fgOptionInput"
              data-testid="input"
              defaultChecked={option.isSelected}
              id={filterId}
              name={option.title}
              onChange={() => update(id, option.id)}
              type="checkbox"
              value={option.id}
            />
            <label className="fgOptionLabel" htmlFor={filterId}>
              {option.title}
            </label>
          </div>
        );
      })}
    </FilterGroupStyled>
  );
};

FilterGroup.propTypes = {
  id: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  update: PropTypes.func,
};

export default FilterGroup;
