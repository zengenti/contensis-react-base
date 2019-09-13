import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../util/formatDate';

const NewsCard = ({ className, title, date, description, image, imageAlt }) => {
  return (
    <div data-testid="card" className={className}>
      <img data-testid="image" src={image} alt={imageAlt} />
      <div data-testid="title">{title}</div>
      <div data-testid="description">{description}</div>
      <span data-testid="date">{formatDate(date, 'dd MMMM yyyy')}</span>
    </div>
  );
};

NewsCard.propTypes = {
  className: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  imageAlt: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
};

export default NewsCard;
