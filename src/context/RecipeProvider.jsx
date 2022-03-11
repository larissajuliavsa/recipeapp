import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './RecipeContext';

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
