import React from 'react';
import PropTypes from 'prop-types';

function RecipeCard({ recipe, index }) {
  return (

    <div
      className="container-home"
      key={ recipe.idMeal || recipe.idDrink }
      data-testid={ `${index}-recipe-card` }
    >
      <img
        className="favorite-img"
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt={ recipe.strMeal || recipe.strDrink }
        data-testid={ `${index}-card-img` }
      />
      <section
        className="home-name"
        data-testid={ `${index}-card-name` }
      >
        { recipe.strMeal || recipe.strDrink }
      </section>
    </div>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;
