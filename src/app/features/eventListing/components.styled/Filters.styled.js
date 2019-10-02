import styled from 'styled-components';

const Filters = styled.div`
  position: relative;

  .fToggleWrap {
    margin-top: 20px;

    @media only screen and (min-width: 550px) {
      width: 50%;
      position: absolute;
      top: -40px;
      right: 0;
      margin-top: 0;
      padding-left: 20px;
    }

    @media only screen and (min-width: 1024px) {
      display: none;
    }
  }

  .fClear {
    padding: 0;
    border: none;
    background: transparent;
    font-size: 16px;
    text-decoration: underline;
    cursor: pointer;
  }

  .filters {
    display: ${props => (props.isOpen ? 'block' : 'none')};
    margin: 12px 0 0 0;
    padding: 20px 16px;
    background: #fff;
    border: 1px solid #eee;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
    width: 100%;

    @media only screen and (min-width: 550px) and (max-width: 1023px) {
      position: absolute;
      z-index: 2;
    }

    @media only screen and (min-width: 1024px) {
      display: block !important;
      margin-top: 0;
      border: none;
      box-shadow: none;
    }
  }
`;

export default Filters;
