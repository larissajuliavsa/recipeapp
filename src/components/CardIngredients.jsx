import React from 'react';
import PropTypes from 'prop-types';
import '../assets/css/CardIngredients.css';

function CardIngredients({ ingredient, index, history, params }) {
  console.log(ingredient);
  const btnRedirectRoute = () => {
    history.push('/foods');
  };

  return (
    <button
      type="button"
      className="btn-ingredient-card"
      data-testid={ `${index}-ingredient-card` }
      onClick={ () => btnRedirectRoute() }
    >
      <img
        data-testid={ `${index}-card-img` }
        className="card-img-ingredient"
        src={ params === 'foods' ? `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png` : `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png` }
        alt={ ingredient }
      />
      <h4
        className="card-title-ingredient"
        data-testid={ `${index}-card-name` }
      >
        {ingredient}
      </h4>
    </button>
  );
}

CardIngredients.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  params: PropTypes.string,
  ingredient: PropTypes.string,
  index: PropTypes.string,
}.isRequired;

export default CardIngredients;
