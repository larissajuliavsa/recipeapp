import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import { getNationalitiesOfMeal } from '../services/NationalitiesOfMeals';

// const QUANTITY_OF_INGREDIENTS = 12;

function ExplorerNationalities(props) {
   const { history } = props;

//   const [ingredientsMeals, setIngredientsMeals] = useState([]);
//   const [ingredientsDrinks, setIngredientsDrinks] = useState([]);

//   const selectIngredients = (list) => {
//     const listFilter = list.filter((_e, i) => i < QUANTITY_OF_INGREDIENTS);
//     return listFilter;
//   };

  useEffect(() => {
    const requestAllNationalities = async () => {
      const xablau = await getIngredientsOfMeal();
      

      // const listMeals = selectIngredients(meals);
      // const listDrinks = selectIngredients(drinks);

      // setIngredientsMeals(listMeals);
      // setIngredientsDrinks(listDrinks);
    };
    requestAllNationalities();
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
    <div>
      {
        foodsAndDrinks === 'foods'
          ? (
            renderCard(ingredientsMeals, 'strIngredient')
          ) : (
            renderCard(ingredientsDrinks, 'strIngredient1')
          )
      }
      <Footer />
    </div>
  );
}

ExplorerNationalities.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  params: PropTypes.shape(),
}.isRequired;

export default ExplorerNationalities;
