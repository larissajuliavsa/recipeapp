import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import getDetailsFoodAPI from '../services/detailsFoodAPI';
import getDetailsDrinkAPI from '../services/detailsDrinkAPI';

import {
  addAndRemoveIngredient,
  addRecipeLocalStorage,
  checkbokLocalStorage,
  checkLocalStorage,
  removeRecipeLocalStorage,
  saveRecipeDoneLocalStorage,
} from '../services/functions';
import { TIMER_MESSAGE } from '../helpers/constants';

import '../assets/css/Details.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import RecipeContext from '../context/RecipeContext';

const copy = require('clipboard-copy');

const TYPE = 'foods';

function InProgress({ history }) {
  const [renderDetails, setRenderDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [messageCopied, setMessageCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { buttonDisabled, enableButton } = useContext(RecipeContext);

  const { id, foodsAndDrinks } = useParams();

  const TYPES_RECIPES = foodsAndDrinks === TYPE ? 'Meal' : 'Drink';

  useEffect(() => {
    async function foodsAndDrinksAPI() {
      if (foodsAndDrinks === TYPE) {
        const recipeAPI = await getDetailsFoodAPI(id);
        setRenderDetails(recipeAPI.meals[0]);
      } else {
        const recipeAPI = await getDetailsDrinkAPI(id);
        setRenderDetails(recipeAPI.drinks[0]);
      }
    }
    foodsAndDrinksAPI();
  }, []);

  useEffect(() => {
    const ingredientKeys = Object.keys(renderDetails)
      .filter((e) => e.includes('strIngredient'));
    const measureKeys = Object.keys(renderDetails)
      .filter((e) => e.includes('strMeasure'));

    const ingredientValues = ingredientKeys.map(
      (ele) => renderDetails[ele],
    );
    const measureValues = measureKeys.map((ele) => renderDetails[ele]);

    setIngredients(ingredientValues);
    setMeasure(measureValues.filter((e) => e !== ' ' && e !== '' && e !== null));
  }, [renderDetails]);

  useEffect(() => {
    setIsFavorite(checkLocalStorage(id));
  }, []);

  function saveLinkClipBoard() {
    copy(`http://localhost:3000/${foodsAndDrinks}/${id}`);
    setMessageCopied(true);
    const setIntervalId = setInterval(() => {
      clearInterval(setIntervalId);
      setMessageCopied(false);
    }, TIMER_MESSAGE);
  }

  function addRecipeFavorite() {
    addRecipeLocalStorage(renderDetails, TYPES_RECIPES);
    setIsFavorite(true);
  }

  function removeRecipeFavorite() {
    removeRecipeLocalStorage(id);
    setIsFavorite(false);
  }

  const {
    strInstructions,
    strCategory,
    strAlcoholic,
    [`str${TYPES_RECIPES}`]: name,
    [`str${TYPES_RECIPES}Thumb`]: image,
  } = renderDetails;

  return (
    <main className="container-details-food">
      <img
        src={ image }
        className="details-image-recipe"
        alt="Foto da Receita"
        data-testid="recipe-photo"
      />
      <div className="container-recipe-introduction">
        {messageCopied && <p>Link copied!</p>}
        <button
          className="btn-share"
          type="button"
          data-testid="share-btn"
          onClick={ saveLinkClipBoard }
        >
          <img
            className="share-icon"
            src={ shareIcon }
            alt="Compartilhar Receita"
          />
        </button>
        <div className="recipe-name-category">
          <h3 className="recipe-name" data-testid="recipe-title">
            {name}
          </h3>
          <div className="recipe-line" />
          <p className="recipe-category" data-testid="recipe-category">
            {foodsAndDrinks === TYPE ? strCategory : strAlcoholic}
          </p>
        </div>
        <button
          className="btn-favorite"
          type="button"
          onClick={ isFavorite ? removeRecipeFavorite : addRecipeFavorite }
        >
          <img
            className="favorite-icon"
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            alt="Favoritar Receita"
            data-testid="favorite-btn"
          />
        </button>
      </div>
      <div className="container-ingredient">
        {measure.length > 0
            && measure.map((element, index) => (
              <label
                htmlFor={ `${index}-ingredient-step` }
                key={ index }
                className="ingredient-measure"
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  type="checkbox"
                  id={ `${index}-ingredient-step` }
                  defaultChecked={
                    checkbokLocalStorage(id, TYPES_RECIPES, ingredients[index])
                  }
                  onClick={ () => {
                    addAndRemoveIngredient(id, ingredients[index], TYPES_RECIPES);
                    enableButton(id, TYPES_RECIPES, measure);
                  } }
                />
                {ingredients[index]}
                {'-'}
                <span>{element}</span>
              </label>
            ))}
      </div>
      <div className="container-instructions">
        <p data-testid="instructions">{strInstructions}</p>
      </div>
      <button
        className="btn-details"
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ buttonDisabled }
        onClick={ () => {
          saveRecipeDoneLocalStorage(renderDetails, TYPES_RECIPES);
          history.push('/done-recipes');
        } }
      >
        Finish Recipe
      </button>
    </main>
  );
}

InProgress.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default InProgress;
