import styled from 'styled-components';

const FeaturedEvents = styled.div`
  display: flex;
  margin: 80px -20px 0;

  .feItem {
    flex-basis: ${100 / 3}%;
  }

  .feItemPadding {
    padding: 0 20px;
  }
`;

export default FeaturedEvents;
