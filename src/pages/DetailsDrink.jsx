/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import RecipeContext from '../context/RecipeContext';
import getRecommendationDrinkAPI from '../services/recommendationDrinkAPI';

// import '../assets/DetailsFood.css';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import getDetailsDrinkAPI from '../services/detailsDrinkAPI';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import {
  addRecipeLocalStorage,
  checkLocalStorage,
  removeRecipeLocalStorage } from '../services/functions';

const copy = require('clipboard-copy');

const API_LENGTH = 6;
const TIMER_MESSAGE = 2000;

function DetailsDrink({ history }) {
  const { location: { pathname } } = history;

  const {
    renderDetailsDrink,
    setRenderDetailsDrink,
    ingredientsDrink,
    setIngredientsDrink,
    measureDrink,
    setMeasureDrink,
    recommendationDrink,
    setRecommendationDrink,
  } = useContext(RecipeContext);
  const [messageCopied, setMessageCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useParams();

  const inProgressKey = JSON.parse(localStorage.getItem('inProgressRecipes'));

  useEffect(() => {
    async function recipeDrinkAPI() {
      const recipeAPI = await getDetailsDrinkAPI(id);
      setRenderDetailsDrink(recipeAPI.drinks[0]);
    }

    async function recommendationAPI() {
      const recommendation = await getRecommendationDrinkAPI();
      const recomendationAPILength = recommendation.meals.slice(0, API_LENGTH);
      setRecommendationDrink(recomendationAPILength);
    }
    recipeDrinkAPI();
    recommendationAPI();
  }, []);

  useEffect(() => {
    const ingredientKeys = Object.keys(renderDetailsDrink)
      .filter((e) => e.includes('strIngredient'));
    const measureKeys = Object.keys(renderDetailsDrink)
      .filter((e) => e.includes('strMeasure'));

    const ingredientValues = ingredientKeys.map(
      (ele) => renderDetailsDrink[ele],
    );
    const measureValues = measureKeys.map((ele) => renderDetailsDrink[ele]);

    setIngredientsDrink(ingredientValues);
    setMeasureDrink(measureValues);
  }, [renderDetailsDrink]);

  function mealsCarousel() {
    return (
      <div className="container-carousel">
        <p>Recommendations to this recipe</p>
        <div className="carousel-scroll">
          {recommendationDrink.map((drink, index) => (
            <div
              key={ index }
              className="carousel-card"
              data-testid={ `${index}-recomendation-card` }
            >
              <img
                className="card-image"
                src={ drink.strMealThumb }
                alt="Compartilhar Receita"
              />
              <p className="card-name" data-testid={ `${index}-recomendation-title` }>
                {drink.strMeal}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function saveLinkClipBoard() {
    copy(`http://localhost:3000${pathname}`);
    setMessageCopied(true);
    const setIntervalId = setInterval(() => {
      clearInterval(setIntervalId);
      setMessageCopied(false);
    }, TIMER_MESSAGE);
  }

  function addRecipeFavorite() {
    addRecipeLocalStorage(renderDetailsDrink, 'Drink');
    setIsFavorite(true);
  }

  function removeRecipeFavorite() {
    removeRecipeLocalStorage(id);
    setIsFavorite(false);
  }

  useEffect(() => {
    setIsFavorite(checkLocalStorage(id));
  }, []);

  function buttonRecipe() {
    const doneKey = JSON.parse(localStorage.getItem('doneRecipes'));

    if (doneKey) {
      const recipeDone = doneKey.filter((ele) => ele.id === id);
      if (recipeDone.length > 0) {
        return null;
      }
    }

    if (inProgressKey && inProgressKey.cocktails[id]) {
      return (
        <button className="btn-details" type="button" data-testid="start-recipe-btn">
          Continue Recipe
        </button>
      );
    }

    return (
      <button
        className="btn-details"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => history.push(`/drinks/${id}/in-progress`) }
      >
        Start Recipe
      </button>
    );
  }

  return (
    <main>
      <img
        src={ renderDetailsDrink.strDrinkThumb }
        style={ { width: '10%' } }
        alt="Foto do Drink"
        data-testid="recipe-photo"
      />
      <h3 data-testid="recipe-title">{renderDetailsDrink.strDrink}</h3>
      { messageCopied && (<p><b>Link copied!</b></p>)}
      <button
        type="button"
        data-testid="share-btn"
        onClick={ saveLinkClipBoard }
      >
        <img src={ shareIcon } alt="Compartilhar Receita" />
      </button>
      <button
        type="button"
        onClick={
          isFavorite
            ? removeRecipeFavorite
            : addRecipeFavorite
        }
      >
        <img
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="Favoritar Receita"
          data-testid="favorite-btn"
        />
      </button>
      <p data-testid="recipe-category">{renderDetailsDrink.strAlcoholic}</p>
      {measureDrink.length > 0
        && measureDrink.map((measure, index) => (
          <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {ingredientsDrink[index]}
            {' '}
            {measure}
          </p>
        ))}
      <p data-testid="instructions">{renderDetailsDrink.strInstructions}</p>
      {mealsCarousel()}
      {buttonRecipe()}
    </main>
  );
}

DetailsDrink.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default DetailsDrink;
