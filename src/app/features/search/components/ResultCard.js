import React from 'react';
import PropTypes from 'prop-types';

import { formatDate, Image, Link } from '../';
import ResultCardStyled from '../components.styled/ResultCard.styled';
import Highlighted from '~/features/search/utils/Highlighted';

const ResultCard = ({
  className,
  date,
  excerpt,
  image,
  isFeaturedCard,
  linkPath,
  // tag,
  title,
  type,
  searchTerm,
}) => {
  return (
    <ResultCardStyled className={className} isFeaturedCard={isFeaturedCard}>
      <div
        className={`rcInner ${type == 'searchOneboxResults' && 'panel info'}`}
      >
        {image && (
          <Link uri={linkPath} className="rcImageWrap">
            <Image
              image={image}
              width={isFeaturedCard ? 250 : 160}
              height={isFeaturedCard ? 250 : 160}
              className="rcImage"
            />
          </Link>
        )}
        <div className="rcDetails">
          <div className="rcDetailsInner">
            {/* {tag && <div className="rcTag">{tag}</div>} */}
            {date && (
              <div className="rcDate">{formatDate(date, 'dd MMM yyyy')}</div>
            )}
            <h2 className="rcTitle">
              <Link uri={linkPath}>
                <span
                  dangerouslySetInnerHTML={Highlighted({
                    text: title,
                    highlight: searchTerm,
                  })}
                />
              </Link>
            </h2>
            {excerpt && !isFeaturedCard && (
              <p
                dangerouslySetInnerHTML={Highlighted({
                  text: excerpt,
                  highlight: searchTerm,
                })}
              />
            )}
            {excerpt && isFeaturedCard && (
              <div
                dangerouslySetInnerHTML={Highlighted({
                  text: excerpt,
                  highlight: searchTerm,
                })}
              />
            )}
          </div>
        </div>
      </div>
    </ResultCardStyled>
  );
};

ResultCard.propTypes = {
  className: PropTypes.string,
  date: PropTypes.string,
  excerpt: PropTypes.string,
  image: PropTypes.object,
  isFeaturedCard: PropTypes.bool,
  linkPath: PropTypes.string,
  tag: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  searchTerm: PropTypes.string,
};

export default ResultCard;
