import styled from 'styled-components';

const FeaturedEventCard = styled.a`
  display: block;
  position: relative;
  line-height: 0;

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
    width: 180px;
    height: 180px;
    background-color: #fff;
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
  }

  .fecDateMonth {
    display: block;
  }

  .fecImage {
    width: 100%;
  }

  .fecTitle {
    position: absolute;
    z-index: 2;
    bottom: 0;
    left: 0;
    margin: 0;
    padding: 32px 16px;
    color: #fff;
    line-height: 1;
  }
`;

export default FeaturedEventCard;
