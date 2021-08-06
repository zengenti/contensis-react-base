import styled, { css } from 'styled-components';
import validateProps from '~/util/validateProps';
import getIn from '~/util/getIn';

const LoginStyled = styled.div`
  ${({ theme }) => {
    const container = getIn(['patterns', 'container'], theme);
    const mq = getIn(['layout', 'mediaQueries'], theme) || {};
    if (Object.keys(theme).length === 0) {
      theme = {
        colors: { components: { loginForm: { backBtn: {}, helpdeskBtn: {} } } },
      };
    }
    validateProps('CenteredCTAStyled', {
      container,
      mq,
    });

    return css`
      .lBack {
        display: none;
        @media only screen and (min-width: ${mq.medium}) {
          font-size: 0.875rem;
          line-height: 24px;
          color: ${theme.colors.components.loginForm.backBtn.color};
          background: ${theme.colors.components.loginForm.backBtn.background};
          padding-left: 32px;
          border: none;
          display: flex;
          align-items: center;
          svg {
            height: 12px;
            padding-right: 12px;
            path {
              fill: ${theme.colors.components.loginForm.backBtn.color};
            }
          }
        }
      }
      .lContainer {
        ${container};
        text-align: center;
        display: block;
        max-width: 384px;
        margin: 0 auto;
      }
      .lTitle {
        font-weight: 500;
        font-size: 1.125rem;
        line-height: 32px;
        color: ${theme.colors.components.loginForm.titleColor};
        margin: 0 0 40px 0;
      }
      .logoutContainer {
        padding: 150px 0;
      }
      .formAvatar {
        margin: 0;
        height: 100px;
        width: 100px;
        img:first-child {
          height: 100%;
          width: 100%;
        }
        .zengenti-icon {
          top: -16px;
          left: 68px;
          width: 50px;
          height: 50px;
        }
      }
      .logoutTitle {
        margin: 16px 0 0;
        font-weight: 500;
        font-size: 1.125rem;
        line-height: 32px;
        color: ${theme.colors.components.loginForm.titleColor};
      }
      .logoutSubmit {
        padding: 12px 0;
        margin-top: 24px;
        font-weight: 500;
        line-height: 24px;
        border-radius: 8px;
        width: 100%;
      }
      .helpdeskLink {
        padding: 12px 0;
        margin-top: 16px;
        font-weight: 500;
        line-height: 24px;
        border-radius: 8px;
        width: 100%;
        display: block;
        border: 2px solid
          ${theme.colors.components.loginForm.helpdeskBtn.border};
        color: ${theme.colors.components.loginForm.helpdeskBtn.color};
        text-decoration: none;
      }
    `;
  }}
`;

export default LoginStyled;
