import styled from 'styled-components';

const MonthFilter = styled.div`
  margin-top: 80px;
  position: relative;

  .mfToggleWrap {
    @media only screen and (min-width: 550px) {
      width: 50%;
      padding-right: 20px;
    }

    @media only screen and (min-width: 1024px) {
      display: none;
    }
  }

  .mfList {
    display: ${props => (props.isOpen ? 'block' : 'none')};
    list-style: none;
    margin: 12px 0 0 0;
    padding: 0;
    background: #fff;
    border: 1px solid #eee;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
    width: 100%;

    @media only screen and (min-width: 550px) and (max-width: 1023px) {
      position: absolute;
      z-index: 2;
      top: 50px;
      margin-top: 0;
    }

    @media only screen and (min-width: 1024px) {
      display: flex !important;
      justify-content: space-between;
      margin: 0 -12px;
      padding: 0 16px;
      border: none;
      box-shadow: none;
    }

    @media only screen and (min-width: 1200px) {
      margin: 0 -16px;
    }
  }

  .mfItem {
    align-self: center;

    @media only screen and (min-width: 1024px) {
      padding: 0 12px;
    }

    @media only screen and (min-width: 1200px) {
      padding: 0 16px;
    }
  }

  .mfButton {
    width: 100%;
    padding: 16px;
    border: none;
    background: transparent;

    font-size: 16px;

    &:not(:disabled) {
      cursor: pointer;

      &:hover {
        background: #f9f9f9;
      }
    }

    &.active {
      color: #aaa;
      font-size: 24px;
    }

    @media only screen and (min-width: 1024px) {
      padding: 0;

      &:hover {
        background: transparent;
      }
    }
  }
`;

export default MonthFilter;
