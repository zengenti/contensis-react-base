import styled, { css } from 'styled-components';
// import colors from '~/themes/contensis/colors';

const colors = { accent: {} };
const TextInputStyled = styled.div`
  color: #444;
  text-align: left;
  &.full-width {
    input {
      max-width: 100%;
    }
  }
  label {
    display: block;
    font-size: 1.125rem;
    line-height: 23px;
    margin-bottom: 5px;
    ${p =>
      p.isRequired &&
      css`
        position: relative;
        display: inline-block;
        &:before {
          content: '*';
          position: absolute;
          right: -12px;
          top: 8px;
          color: ${colors.accent.cardinal_red};
          line-height: 0;
        }
      `}
  }
  input {
    font-family: ${p =>
      p.theme.typography && p.theme.typography.default.font_family};
    font-size: 0.875rem;
    line-height: 18px;
    max-width: 282px;
    width: 100%;
    background: #ffffff;
    border: 1px solid #dbdbdb;
    border-radius: 8px;
    padding: 8px 16px;
    color: inherit;
  }
`;

export default TextInputStyled;
