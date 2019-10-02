import styled from 'styled-components';

const EventCard = styled.div`
  @media only screen and (min-width: 550px) {
    display: flex;
    align-items: center;
  }

  .ecDate {
    font-weight: 300;
    font-size: 20px;

    @media only screen and (min-width: 550px) {
      flex-basis: 180px;
      flex-grow: 0;
      flex-shrink: 0;
      padding: 32px 0;
      text-align: center;
    }
  }

  .ecDateDay {
    color: #aaa;

    @media only screen and (min-width: 550px) {
      font-size: 56px;
      display: block;
    }
  }

  .ecDateMonth {
    color: #222;

    @media only screen and (min-width: 550px) {
      display: block;
      font-size: 40px;
    }
  }

  .ecContent {
    @media only screen and (min-width: 550px) {
      padding: 24px 0 24px 32px;
      border-left: 1px solid;
    }
  }

  .ecTitle {
    margin: 16px 0 0 0;

    @media only screen and (min-width: 550px) {
      margin: 0;
    }

    a {
      text-decoration: none;

      color: #222;
    }
  }

  .ecDescription {
    margin: 16px 0 0 0;
    min-height: 44px;
    line-height: 1.4;
  }

  .ecLocation {
    margin: 16px 0 0 0;
    text-transform: uppercase;

    color: #aaa;
  }
`;

export default EventCard;
