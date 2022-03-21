import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './RecipeContext';
import * as radioAPI from '../services/radioAPI';

function RecipeProvider({ children }) {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginButtonDisabled, setLoginButtonDisabled] = useState(true);

  const [renderDetailsFood, setRenderDetailsFood] = useState([]);
  const [ingredientsFood, setIngredientsFood] = useState([]);
  const [measureFood, setMeasureFood] = useState([]);

  const [renderDetailsDrink, setRenderDetailsDrink] = useState([]);
  const [ingredientsDrink, setIngredientsDrink] = useState([]);
  const [measureDrink, setMeasureDrink] = useState([]);

  const [recommendationDrink, setRecommendationDrink] = useState([]);
  const [recommendationFood, setRecommendationFood] = useState([]);

  const [videoId, setVideoId] = useState('');

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [drinksData, setDrinksData] = useState([]);
  const [mealsData, setMealsData] = useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      const responseMeals = await radioAPI.getMeals();
      setMealsData(responseMeals);
      const responseDrinks = await radioAPI.getDrinks();
      setDrinksData(responseDrinks);
    }
    fetchMyAPI();
  }, []);

  const isLoginButtonDisabled = () => {
    const MIN_LENGTH = 6;
    const validate = loginEmail.includes('@' && '.com');

    if (loginPassword.length >= MIN_LENGTH && validate) {
      setLoginButtonDisabled(false);
    } else {
      setLoginButtonDisabled(true);
    }
  };

  const handleChange = ({ target }) => {
    const { id, value } = target;

    if (id === 'email-input') {
      setLoginEmail(value);
    } else {
      setLoginPassword(value);
    }
    isLoginButtonDisabled();
  };

  const enableButton = (id, type, measure) => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const mealsOrCocktails = type === 'Meal' ? 'meals' : 'cocktails';
    if (inProgressRecipes[mealsOrCocktails][id].length === measure.length) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  const valueProvider = {
    loginEmail,
    loginPassword,
    loginButtonDisabled,
    handleChange,
    renderDetailsFood,
    setRenderDetailsFood,
    renderDetailsDrink,
    setRenderDetailsDrink,
    ingredientsFood,
    setIngredientsFood,
    measureFood,
    setMeasureFood,
    ingredientsDrink,
    setIngredientsDrink,
    measureDrink,
    setMeasureDrink,
    videoId,
    setVideoId,
    recommendationFood,
    setRecommendationFood,
    recommendationDrink,
    setRecommendationDrink,
    buttonDisabled,
    enableButton,
    drinksData,
    setDrinksData,
    mealsData,
    setMealsData,
  };

  return (
    <RecipeContext.Provider value={ valueProvider }>
      {children}
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.array,
}.isRequired;

export default RecipeProvider;
