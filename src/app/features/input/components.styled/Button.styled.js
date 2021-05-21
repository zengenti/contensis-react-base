import styled, { css } from 'styled-components';

const ButtonStyled = styled.button`
  ${({ theme, isHollow, disabled }) => {
    if (Object.keys(theme).length === 0) {
      theme = {
        colors: {
          components: {
            button: {
              outlined: { focused: {} },
              contained: { disabled: {}, focused: {} },
            },
          },
        },
      };
    }
    return css`
      display: block;
      margin-top: 10px;
      border-radius: 3px;
      padding: 5px 10px;
      line-height: 1;
      font-weight: 400;
      text-decoration: none;
      transition: all 0.2s ease-out 0s;
      background-color: ${isHollow
        ? theme.colors.components.button.outlined.background
        : theme.colors.components.button.contained.background};
      border: 1px solid
        ${isHollow
          ? theme.colors.components.button.outlined.border
          : theme.colors.components.button.contained.border};
      color: ${isHollow
        ? theme.colors.components.button.outlined.color
        : theme.colors.components.button.contained.color};
      font-size: 1rem;
      &:hover {
        background-color: ${isHollow
          ? theme.colors.components.button.outlined.focused.background
          : theme.colors.components.button.contained.focused.background};
        color: ${isHollow
          ? theme.colors.components.button.outlined.focused.color
          : theme.colors.components.button.contained.focused.color};
      }

      :disabled,
      [disabled] {
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.3;
        cursor: not-allowed;
        color: ${theme.colors.components.button.contained.disabled.color};
        background-color: ${theme.colors.components.button.contained.disabled
          .background};
        border: 1px solid
          ${theme.colors.components.button.contained.disabled.border};
        svg {
          margin-left: 16px;
        }
      }
      ${isHollow &&
      disabled &&
      css`
        :disabled,
        [disabled] {
          color: #757575;
          background: transparent;
          border-color: #757575;
        }
      `}
    `;
  }}
`;

export default ButtonStyled;
