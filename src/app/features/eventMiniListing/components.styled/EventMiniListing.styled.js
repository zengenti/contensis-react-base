import styled from 'styled-components';

const EventMiniListing = styled.div`
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

  margin-top: 120px;

  .emlHeader {
    @media only screen and (min-width: 600px) {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .emlTitle {
    margin: 0;
  }

  .emlListingLink {
    display: block;
    margin-top: 48px;
    padding: 20px;
    border: 1px solid;
    text-align: center;
    text-decoration: none;
    color: #222;

    @media only screen and (min-width: 600px) {
      margin-top: 0;
    }

    @media only screen and (min-width: 1024px) {
      flex-basis: 290px;
    }
  }

  .emlWrap {
    margin-top: 64px;

    @media only screen and (min-width: 1024px) {
      display: flex;
      margin: 64px -20px 0;
      justify-content: space-between;
    }
  }

  .emlColumnPadding {
    height: 100%;
    @media only screen and (min-width: 1024px) {
      padding: 0 20px;
    }
  }

  .emlFeatured {
    flex-basis: ${(100 / 12) * 5}%;
    flex-grow: 0;
  }

  .emlList {
    flex-basis: ${(100 / 12) * 7}%;
    flex-grow: 0;
  }

  .emlItem {
    margin-top: 48px;

    @media only screen and (min-width: 1024px) {
      &:first-child {
        margin-top: 0;
      }
    }
  }
`;

export default EventMiniListing;
