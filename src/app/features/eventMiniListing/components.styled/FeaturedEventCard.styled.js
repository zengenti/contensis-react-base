import styled from 'styled-components';

const FeaturedEventCard = styled.a`
  display: flex;
  align-items: flex-end;
  position: relative;
  height: 100%;
  min-height: 320px;
  overflow: hidden;
  line-height: 0;
  text-decoration: none;

  background-image: url(${props => props.imagePath});
  background-size: cover;
  background-position: center center;

  @media only screen and (min-width: 700px) {
    padding: 25%;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));
  }

  .fecDate {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100px;
    height: 100px;
    background-color: #fff;

    font-weight: 300;

    @media only screen and (min-width: 700px) {
      width: 180px;
      height: 180px;
    }
  }

  .fecDateInner {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    transform: translateY(-50%);
    text-align: center;
    line-height: 1;
  }

  .fecDateDay {
    display: block;
    font-size: 40px;
    color: #aaa;

    @media only screen and (min-width: 700px) {
      font-size: 56px;
    }
  }

  .fecDateMonth {
    display: block;
    font-size: 28px;
    color: #222;

    @media only screen and (min-width: 700px) {
      font-size: 40px;
    }
  }

  .fecTitle {
    position: relative;
    z-index: 2;
    bottom: 0;
    left: 0;
    margin: 100px 0 0 0;
    padding: 32px 16px;
    color: #fff;
    line-height: 1;

    font-size: 40px;
    font-weight: 400;

    @media only screen and (min-width: 700px) {
      position: absolute;
      margin-top: 0;
    }
  }
`;

export default FeaturedEventCard;
