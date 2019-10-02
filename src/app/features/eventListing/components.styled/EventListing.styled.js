import styled from 'styled-components';

const EventListing = styled.div`
  /* to remove */
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400&display=swap');
  font-family: Roboto;
  * {
    box-sizing: border-box;
  }
  /* ^^^ */
  margin: auto;
  width: 100%;
  max-width: 1280px;

  .feWrap {
    @media only screen and (min-width: 1024px) {
      display: flex;
      margin: 80px -20px 0;
      flex-direction: row-reverse;
      justify-content: space-between;
    }
  }

  .feColumnPadding {
    @media only screen and (min-width: 1024px) {
      padding: 0 20px;
    }
  }

  .feFilters {
    flex-basis: ${(100 / 12) * 3}%;
  }

  .feList {
    flex-basis: ${(100 / 12) * 8}%;
  }
`;

export default EventListing;
