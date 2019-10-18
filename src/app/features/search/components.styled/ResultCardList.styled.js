import styled from 'styled-components';

const NewsCardListStyled = styled.div`
  .nclRow {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -${props => props.theme.layout.gutter};
  }

  .nclItem {
    flex-basis: ${100 / 4}%;
    margin-top: 50px;
  }

  .nclItemPadding {
    padding: ${props => props.theme.layout.gutter};
  }

  .resultsInfo {
    margin-top: 0;
  }
`;

NewsCardListStyled.defaultProps = {
  theme: {
    layout: {
      gutter: '12px',
    },
  },
};

export default NewsCardListStyled;
