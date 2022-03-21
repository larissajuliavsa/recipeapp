import React from 'react';
import PropTypes from 'prop-types';

function DrinkCards({ index, strDrinkThumb, strDrink }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img src={ strDrinkThumb } alt="recipe-card" data-testid={ `${index}-card-img` } />
      <span data-testid={ `${index}-card-strDrink` }>{strDrink}</span>
    </div>
  );
}

DrinkCards.propTypes = {
  index: PropTypes.number.isRequired,
  strDrinkThumb: PropTypes.string.isRequired,
  strDrink: PropTypes.string.isRequired,
};

export default DrinkCards;
