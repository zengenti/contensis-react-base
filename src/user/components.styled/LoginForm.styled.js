import styled, { css } from 'styled-components';
import validateProps from '~/util/validateProps';
import getIn from '~/util/getIn';

const LoginFormStyled = styled.div`
  ${({ theme }) => {
    const mqMedium = getIn(['layout', 'mediaQueries', 'medium'], theme);
    if (Object.keys(theme).length === 0) {
      theme = {
        colors: {
          components: {
            loginForm: { input: {}, placeholder: {} },
            linkedTickets: { checkbox: {} },
          },
        },
      };
    }
    validateProps('HeroTwoColumnStyled', {
      mqMedium,
    });
    return css`
      margin: 20px auto;
      width: 100%;
      .lfUsername,
      .lfPassword {
        input {
          max-width: 100%;
          font-size: 0.875rem;
          line-height: 24px;
          background: ${theme.colors.components.loginForm.input.background};
          color: ${theme.colors.components.loginForm.input.color};
          border: 1px solid ${theme.colors.components.loginForm.input.border};
          border-radius: 8px;
          padding: 12px 16px;
          ::placeholder {
            color: ${theme.colors.components.loginForm.placeholder.color};
          }
        }
        label {
          display: none;
        }
      }
      .lfUsername {
        input {
          margin-bottom: 32px;
        }
      }
      .lfSubmiting {
        display: block;
        margin-top: 16px;
        color: ${theme.colors.components.loginForm.txtColor};
      }
      .lfFail {
        color: ${theme.colors.components.loginForm.failedColor};
        margin-top: 16px;
      }
      .lfLink {
        color: ${theme.colors.components.loginForm.linkColor};
        font-size: 0.75rem;
        line-height: 24px;
        font-size: 0.75rem;
        text-decoration: none;
        @media only screen and (min-width: ${mqMedium}) {
          font-size: 0.875rem;
        }
      }
      .lfContainer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 24px;
      }
      /* Checkbox Styles */
      .lfLabel input[type='checkbox'] {
        display: none;
      }
      .lfCheckmark {
        display: block;
        max-width: 24px;
        width: 100%;
        height: 24px;
        background-color: ${theme.colors.components.linkedTickets.checkbox
          .background};
        border-radius: 25%;
        position: relative;
        transition: background-color 400ms;
        margin-right: 8px;
        &:after {
          content: '';
          position: absolute;
          width: 6px;
          height: 12px;
          border-right: 2px solid
            ${theme.colors.components.linkedTickets.checkbox.color};
          border-bottom: 2px solid
            ${theme.colors.components.linkedTickets.checkbox.color};
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%) rotateZ(40deg) scale(0);
          opacity: 0;
          transition: all 400ms;
        }
      }
      .lfLabel input[type='checkbox']:checked ~ span:after {
        opacity: 1;
        transform: translate(-50%, -50%) rotateZ(40deg) scale(1);
      }
      .lfLabel {
        font-size: 0.75rem;
        line-height: 24px;
        color: ${theme.colors.components.loginForm.checkboxLabelColor};
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        justify-content: flex-end;
        flex-basis: 50%;
        cursor: pointer;
        @media only screen and (min-width: ${mqMedium}) {
          font-size: 0.875rem;
        }
      }
      /* End */
      .lfForgot {
        margin-top: 0;
        flex-basis: 50%;
        text-align: end;
      }
      .lfSubmit {
        width: 100%;
        padding: 12px 0;
        margin-top: 32px;
        font-weight: 500;
        line-height: 24px;
        border-radius: 8px;
      }
      .lfAvatar {
        position: relative;
        display: inline-block;
        width: 56px;
        height: 56px;
        background: ${theme.colors.components.loginForm.avatarBg};
        border-radius: 50%;
        width: 56px;
        border-radius: 50%;
        margin-top: 64px;
        &:after {
          content: '';
          background-image: url(${null});
          background-repeat: no-repeat;
          background-position-x: center;
          background-position-y: center;
          width: 56px;
          height: 56px;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
      .lfNew {
        display: block;
        font-size: 1rem;
        line-height: 32px;
        color: ${theme.colors.components.loginForm.txtColor};
        text-decoration: none;
        margin-top: 6px;
        &:hover {
          text-decoration: underline;
        }
      }
    `;
  }}
`;

export default LoginFormStyled;
