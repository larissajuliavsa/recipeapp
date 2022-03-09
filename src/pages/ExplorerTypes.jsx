import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import {
  getAletorieRecipeDrink,
  getAletorieRecipeFood,
} from '../service/AletoriesRecipes';

function ExplorerTypes(props) {
  const { history, match } = props;
  const { params } = match;
  const { foodsAndDrinks } = params;

  const btnRedirectRoute = (route) => {
    history.push(`/explore/${foodsAndDrinks}/${route}`);
  };

  const redirectRoute = (route) => {
    history.push(`/${foodsAndDrinks}/${route}`);
  };

  const btnSurprise = async () => {
    if (foodsAndDrinks === 'foods') {
      const recipeMeal = await getAletorieRecipeFood();
      const { meals } = recipeMeal;
      const { idMeal } = meals[0];
      redirectRoute(idMeal);
    }
    if (foodsAndDrinks === 'drinks') {
      const recipeDrink = await getAletorieRecipeDrink();
      const { drinks } = recipeDrink;
      const { idDrink } = drinks[0];
      redirectRoute(idDrink);
    }
  };

  return (
    <div>
      <span>Tela ExploreTypes na rota /explorer/:foodsAndDrinks</span>
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => btnRedirectRoute('ingredients') }
      >
        By Ingredient
      </button>
      {
        foodsAndDrinks === 'foods' && (
          <button
            type="button"
            data-testid="explore-by-nationality"
            onClick={ () => btnRedirectRoute('nationalities') }
          >
            By Nationality
          </button>)
      }
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => btnSurprise() }
      >
        Surprise me!
      </button>
      <Footer />
    </div>
  );
}

ExplorerTypes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  params: PropTypes.shape(),
}.isRequired;

export default ExplorerTypes;
