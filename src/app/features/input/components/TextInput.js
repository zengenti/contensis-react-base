import React from 'react';
import PropTypes from 'prop-types';
import TextInputStyled from '../components.styled/TextInput.styled';
import VisuallyHidden from '~/features/visuallyHidden';
const TextInput = ({
  className = '',
  type = 'text',
  placeholder,
  label,
  hideLabel = false,
  id,
  name,
  onChange,
  onBlur,
  defaultValue,
  readOnly,
  autoComplete,
  isRequired,
}) => {
  return (
    <TextInputStyled className={className} isRequired={isRequired}>
      <label aria-hidden={hideLabel} htmlFor={id}>
        {label}
        {isRequired && <VisuallyHidden text=" - Required Field" />}
      </label>
      <input
        defaultValue={defaultValue ? defaultValue : null}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange ? onChange : null}
        onBlur={onBlur ? onBlur : null}
        disabled={readOnly}
        autoComplete={autoComplete ? autoComplete : 'off'}
      ></input>
    </TextInputStyled>
  );
};

TextInput.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf([
    'text',
    'email',
    'hidden',
    'number',
    'password',
    'search',
    'tel',
    'url',
  ]),
  label: PropTypes.string,
  hideLabel: PropTypes.bool,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  readOnly: PropTypes.bool,
  isRequired: PropTypes.bool,
  autoComplete: PropTypes.string,
};

export default TextInput;
