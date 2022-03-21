import React from 'react';
import PropTypes from 'prop-types';

function HomeCards({ index, strMealThumb, strMeal }) {
  return (
    <div className="container-home" data-testid={ `${index}-recipe-card` }>
      <img
        className="favorite-img"
        src={ strMealThumb }
        alt="recipe-card"
        data-testid={ `${index}-card-img` }
      />
      <span
        className="home-name"
        data-testid={ `${index}-card-strMeal` }
      >
        {strMeal}
      </span>
    </div>
  );
}

HomeCards.propTypes = {
  index: PropTypes.number.isRequired,
  strMealThumb: PropTypes.string.isRequired,
  strMeal: PropTypes.string.isRequired,
};

export default HomeCards;
