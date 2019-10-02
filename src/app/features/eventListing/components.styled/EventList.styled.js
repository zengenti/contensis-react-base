import styled from 'styled-components';

const EventList = styled.ul`
  margin: 0;
  padding: 40px 0 0 0;
  list-style: none;

  @media only screen and (min-width: 1024px) {
    padding-top: 0;
  }

  .elItem {
    margin-top: 48px;

    &:first-child {
      margin-top: 0;
    }
  }
`;

export default EventList;
