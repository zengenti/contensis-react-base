import styled from 'styled-components';

const FilterGroup = styled.div`
  margin-top: 40px;

  .fgTitle {
    margin: 0;
  }

  .fgOption {
    margin-top: 12px;
    &:nth-child(2) {
      margin-top: 24px;
    }
  }

  .fgOptionLabel {
    margin-left: 5px;
  }
`;

export default FilterGroup;
