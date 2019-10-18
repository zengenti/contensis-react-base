import styled from 'styled-components';

const ResultCardStyled = styled.div`
  display: block;
  color: #333;
  text-decoration: none;

  mark {
    font-weight: bolder;
    background: inherit;
    color: inherit;
  }

  ${props =>
    props.isFeaturedCard
      ? ''
      : 'border-top: 1px solid #d8d8d8; margin-top: 0;'};

  .rcInner {
    display: flex;
  }

  .rcImageWrap {
    flex-basis: ${props => (props.isFeaturedCard ? '250px' : '160px')};
    flex-shrink: 0;
    flex-grow: 0;
    padding-top: ${props => (props.isFeaturedCard ? '0' : '25px')};
    line-height: 0;
  }

  .rcDetails {
    flex-grow: 1;
  }

  .rcDetailsInner {
    padding: 20px 0;
    position: relative;
  }

  .rcTag {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    padding: 7px 15px;
    line-height: 1;
    background: #575757;
    color: #fff;
  }

  .rcTitle {
    ${props =>
      props.theme &&
      props.theme.typographyStyles &&
      props.theme.typographyStyles.h5Styles}
    margin-top: 0;
  }

  .rcDate {
    margin-top: 15px;
  }
`;

ResultCardStyled.defaultProps = {
  theme: {},
};

export default ResultCardStyled;
