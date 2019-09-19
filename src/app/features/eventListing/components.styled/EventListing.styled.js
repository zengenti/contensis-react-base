import styled from 'styled-components';

const FeaturedEvents = styled.div`
  margin: auto;
  width: 100%;
  max-width: 1280px;

  .feWrap {
    display: flex;
    margin: 0 -16px;
    flex-direction: row-reverse;
    justify-content: space-between;
  }

  .feColumnPadding {
    padding: 0 16px;
  }

  .feFilters {
    width: ${(100 / 12) * 3}%;
  }

  .feList {
    width: ${(100 / 12) * 8}%;
  }
`;

export default FeaturedEvents;
