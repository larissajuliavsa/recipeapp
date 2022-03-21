import React from 'react';
import PropTypes from 'prop-types';

function HomeCard({ index, image, name }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img src={ image } alt="recipe-card" data-testid={ `${index}-card-img` } />
      <span data-testid={ `${index}-card-name` }>{name}</span>
    </div>
  );
}

HomeCard.propTypes = {
  index: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default HomeCard;
