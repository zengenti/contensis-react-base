import styled from 'styled-components';

const NewsListingStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -${props => props.theme && props.theme.layout && props.theme.layout.gutter};
  margin-top: 20px;
  justify-content: space-between;
  .srMain {
    width: 100%;
  }
  .columnPadding {
    padding: 0
      ${props => props.theme && props.theme.layout && props.theme.layout.gutter};
  }
`;

NewsListingStyled.defaultProps = {
  theme: {},
};

export default NewsListingStyled;
