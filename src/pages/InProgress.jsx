import React, { useContext, useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import RecipeContext from '../context/RecipeContext';
import getDetailsFoodAPI from '../services/detailsFoodAPI';

import {
  addRecipeLocalStorage,
  checkLocalStorage,
  removeRecipeLocalStorage,
} from '../services/functions';
import { TIMER_MESSAGE } from '../helpers/constants';

import '../assets/css/DetailsFood.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function InProgress() {
  const {
    renderDetailsFood,
    setRenderDetailsFood,
    ingredientsFood,
    setIngredientsFood,
    measureFood,
    setMeasureFood,
  } = useContext(RecipeContext);
  const [messageCopied, setMessageCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  // const [buttonDisabled, setButtonDisabled] = useState(true);

  const { id } = useParams();
  const location = useLocation();
  // const history = useHistory();useHistory

  useEffect(() => {
    async function recipeFoodAPI() {
      const recipeAPI = await getDetailsFoodAPI(id);
      setRenderDetailsFood(recipeAPI.meals[0]);
    }
    recipeFoodAPI();
  }, []);

  useEffect(() => {
    const ingredientKeys = Object.keys(renderDetailsFood)
      .filter((e) => e.includes('strIngredient'));
    const measureKeys = Object.keys(renderDetailsFood)
      .filter((e) => e.includes('strMeasure'));

    const ingredientValues = ingredientKeys.map(
      (ele) => renderDetailsFood[ele],
    );
    const measureValues = measureKeys.map((ele) => renderDetailsFood[ele]);

    setIngredientsFood(ingredientValues);
    setMeasureFood(measureValues.filter((e) => e !== ' '));
  }, [renderDetailsFood]);

  useEffect(() => {
    setIsFavorite(checkLocalStorage(id));
  }, []);

  function saveLinkClipBoard() {
    copy(`http://localhost:3000${location.pathname}`);
    setMessageCopied(true);
    const setIntervalId = setInterval(() => {
      clearInterval(setIntervalId);
      setMessageCopied(false);
    }, TIMER_MESSAGE);
  }

  function addRecipeFavorite() {
    addRecipeLocalStorage(renderDetailsFood, 'Meal');
    setIsFavorite(true);
  }

  function removeRecipeFavorite() {
    removeRecipeLocalStorage(id);
    setIsFavorite(false);
  }

  console.log(measureFood);

  return (
    <main className="container-details-food">
      <img
        src={ renderDetailsFood.strMealThumb }
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
            {renderDetailsFood.strMeal}
          </h3>
          <div className="recipe-line" />
          <p className="recipe-category" data-testid="recipe-category">
            {renderDetailsFood.strCategory}
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
        {measureFood.length > 0
            && measureFood.map((measure, index) => (
              <label
                htmlFor={ `${index}-ingredient-name-and-measure` }
                key={ index }
                className="ingredient-measure"
              >
                <input
                  type="checkbox"
                  data-testid={ `${index}-ingredient-name-and-measure` }
                  id={ `${index}-ingredient-name-and-measure` }
                />
                {ingredientsFood[index]}
                {' '}
                <span>{measure}</span>
              </label>
            ))}
      </div>
      <div className="container-instructions">
        <p data-testid="instructions">{renderDetailsFood.strInstructions}</p>
      </div>
      <button
        className="btn-details"
        type="button"
        data-testid="finish-recipe-btn"
        // disabled={ buttonDisabled }
      >
        Finish Recipe
      </button>
    </main>
  );
}

export default InProgress;
