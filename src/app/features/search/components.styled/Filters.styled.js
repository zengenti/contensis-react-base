import styled from 'styled-components';

const FiltersStyled = styled.div`
  .filtersTitle {
    margin-top: 0;
  }

  .filterList {
    margin: 25px 0 0 0;
    padding: 0;
    list-style: none;
  }

  .filterItem {
    padding: 25px 0;
    font-size: 20px;
    border-top: 1px solid #eee;

    &:last-child {
      border-bottom: 1px solid #eee;
    }
  }

  .filterLabel {
    margin-left: 10px;
  }
`;

FiltersStyled.defaultProps = {
  theme: {},
};

export default FiltersStyled;
