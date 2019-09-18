import React from 'react';
import PropTypes from 'prop-types';

const FilterGroup = ({ id, options, title, update }) => {
  if (!options || options.length < 1) return null;

  return (
    <div data-testid="filterGroup">
      <h3 data-testid="title">{title}</h3>
      <div>
        {options.map((option, idx) => {
          const filterId = `${option.title}-${idx}`;
          return (
            <div data-testid="filterOption" key={filterId}>
              <input
                data-testid="input"
                type="checkbox"
                name={filterId}
                value={option.id}
                defaultChecked={option.isSelected}
                onChange={() => update(id, option.id)}
              />
              <label htmlFor={filterId}>{option.title}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

FilterGroup.propTypes = {
  id: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  update: PropTypes.func,
};

export default FilterGroup;
