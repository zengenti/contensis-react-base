import styled from 'styled-components';

const FeaturedNewsStyled = styled.div`
  /* styles */
  padding-bottom: 10px;
  border-radius: 5px;
  .panel {
    margin: 2em 0;
    &.info {
      background-color: #efefe9;
      margin-left: 50px;
      padding: 15px;
      border-radius: 5px;
      .rcDetailsInner {
        padding: 0;
        p {
          margin: 10px 0 0 0;
        }
      }
    }
  }
`;

FeaturedNewsStyled.defaultProps = {
  theme: {
    layout: {
      gutter: '12px',
    },
  },
};

export default FeaturedNewsStyled;
