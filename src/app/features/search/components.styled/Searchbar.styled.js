import styled, { css } from 'styled-components';
import { getIn } from '../';

const innerStyles = css`
  position: relative;
`;

const inputStyles = css`
  width: 100%;
  height: 50px;
  border: none;
  padding: 0 100px 0 30px;

  @media only screen and (min-width: ${props =>
      getIn(['theme', 'layout', 'mediaQueries', 'mlarge'], props)}) {
    height: 70px;
  }
`;

const buttonStyles = css`
  border: none;
  background: transparent;
  width: 50px;
  height: 50px;
  position: absolute;
  right: 0;
  top: 0;

  @media only screen and (min-width: ${props =>
      getIn(['theme', 'layout', 'mediaQueries', 'mlarge'], props)}) {
    width: 70px;
    height: 70px;
  }
`;

const iconStyles = css`
  height: 20px;

  @media only screen and (min-width: ${props =>
      getIn(['theme', 'layout', 'mediaQueries', 'mlarge'], props)}) {
    height: 28px;
  }
`;

const SearchbarStyled = styled.div`
  .sbInner {
    ${innerStyles}
  }

  .sbInput {
    ${inputStyles}
    background: transparent;
    border-bottom: 1px solid #fff;
    font-size: 18px;
    margin: 0;
    line-height: 1;
    color: #fff;
    padding-left: 0;

    &::placeholder {
      color: #fff;
    }

    @media only screen and (min-width: ${props =>
        getIn(['theme', 'layout', 'mediaQueries', 'mlarge'], props)}) {
      font-size: 23px;
    }
  }

  .sbButton {
    ${buttonStyles}
    text-align:right;
  }

  .sbIcon {
    ${iconStyles}
  }
`;

export default SearchbarStyled;

export const SearchbarSearchPageStyled = styled.div`
  border-bottom: 1px solid #555;
  padding: 70px 0;

  .sbInner {
    ${innerStyles}
  }

  .sbInput {
    ${inputStyles}
    border: 1px solid #555;
  }

  .sbButton {
    ${buttonStyles}
  }

  .sbIcon {
    ${iconStyles}
  }
`;
