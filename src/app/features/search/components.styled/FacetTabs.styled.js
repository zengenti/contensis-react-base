import styled from 'styled-components';

const FacetTabsStyled = styled.div`
  margin-top: 70px;

  .ftList {
    list-style: none;
    margin: 0;
    padding: 0;
    border-bottom: 1px solid #575757;
  }

  .ftItem {
    display: inline-block;
    padding-bottom: 30px;
    margin-right: 80px;

    &:last-child {
      margin-right: 0;
    }
  }

  .activeTab {
    position: relative;

    &:after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 4px;
      background: #575757;
    }
  }

  .ftButton {
    border: none;
    background: transparent;
    font-size: 20px;
  }
`;

FacetTabsStyled.defaultProps = {
  theme: {},
};

export default FacetTabsStyled;
