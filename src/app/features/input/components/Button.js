import React from 'react';
import PropTypes from 'prop-types';
import ButtonStyled from '../components.styled/Button.styled';
const loader = (
  <svg
    // style="margin: auto;; display: block; shape-rendering: auto; animation-play-state: running; animation-delay: 0s;"
    width="20px"
    height="20px"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <circle
      cx="50"
      cy="50"
      fill="none"
      stroke="#ffffff"
      strokeWidth="10"
      r="35"
      strokeDasharray="164.93361431346415 56.97787143782138"
      style={{ animationPlayState: 'running', animationDelay: '0s' }}
      transform="rotate(311.547 50 50)"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        repeatCount="indefinite"
        dur="1s"
        values="0 50 50;360 50 50"
        keyTimes="0;1"
        style={{ animationPlayState: 'running', animationDelay: '0s' }}
      ></animateTransform>
    </circle>
  </svg>
);
const Button = ({
  className,
  action,
  label,
  disabled,
  isHollow,
  type,
  loading,
}) => {
  if (disabled || loading) {
    return (
      <ButtonStyled
        className={className}
        onClick={() => action()}
        disabled
        isHollow={isHollow}
        type={type}
      >
        {label}
        {loading && loader}
      </ButtonStyled>
    );
  }
  return (
    <ButtonStyled
      className={className}
      onClick={() => action()}
      isHollow={isHollow}
      type={type}
    >
      {label}
    </ButtonStyled>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  action: PropTypes.func,
  disabled: PropTypes.bool,
  isHollow: PropTypes.bool,
  type: PropTypes.string,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  type: 'button',
  loading: false,
};

export default Button;
