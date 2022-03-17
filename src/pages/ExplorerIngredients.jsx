import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CardIngredients from '../components/CardIngredients';
import Footer from '../components/Footer';
import {
  getIngredientsOfDrink,
  getIngredientsOfMeal,
} from '../services/AllRecipeIngredients';
import backIcon from '../images/backIcon.svg';
import '../assets/css/ExplorerTypes.css';
import '../assets/css/CardIngredients.css';

const QUANTITY_OF_INGREDIENTS = 12;

function ExplorerIngredients(props) {
  const { history, match } = props;
  const { params } = match;
  const { foodsAndDrinks } = params;

  const [ingredientsMeals, setIngredientsMeals] = useState([]);
  const [ingredientsDrinks, setIngredientsDrinks] = useState([]);

  const selectIngredients = (list) => {
    const listFilter = list.filter((_e, i) => i < QUANTITY_OF_INGREDIENTS);
    return listFilter;
  };

  useEffect(() => {
    const requestAllIngredients = async () => {
      const { meals } = await getIngredientsOfMeal();
      const { drinks } = await getIngredientsOfDrink();

      const listMeals = selectIngredients(meals);
      const listDrinks = selectIngredients(drinks);

      setIngredientsMeals(listMeals);
      setIngredientsDrinks(listDrinks);
    };
    requestAllIngredients();
  }, []);

  const renderCard = (array, str) => (
    array.map((e, i) => (
      <CardIngredients
        key={ i }
        ingredient={ e[str] }
        index={ i }
        history={ history }
        params={ foodsAndDrinks }
      />
    ))
  );

  return (
    <>
      <button
        onClick={ () => history.push('/explore') }
        type="button"
        className="btn-back-explore"
      >
        <img src={ backIcon } alt="Back to explore" />
        <p className="btn-explore-name">Explore</p>
      </button>
      <section className="container-ingredients">
        {
          foodsAndDrinks === 'foods'
            ? (
              renderCard(ingredientsMeals, 'strIngredient')
            ) : (
              renderCard(ingredientsDrinks, 'strIngredient1')
            )
        }
      </section>
      <Footer />
    </>
  );
}

ExplorerIngredients.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  params: PropTypes.shape(),
}.isRequired;

export default ExplorerIngredients;
