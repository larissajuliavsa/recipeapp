/* eslint-disable import/no-unresolved */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';

import RecipeContext from '../context/RecipeContext';
import getDetailsFoodAPI from '../services/detailsFoodAPI';
import getRecommendationFoodAPI from '../services/recommendationFoodAPI';

import '../assets/DetailsFood.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import {
  addRecipeLocalStorage,
  checkLocalStorage,
  removeRecipeLocalStorage } from '../services/functions';

const getYouTubeID = require('get-youtube-id');

const copy = require('clipboard-copy');

const API_LENGTH = 6;
const TIMER_MESSAGE = 2000;

function DetailsFood({ history }) {
  const { location: { pathname } } = history;

  const {
    renderDetailsFood,
    setRenderDetailsFood,
    ingredientsFood,
    setIngredientsFood,
    measureFood,
    setMeasureFood,
    recommendationFood,
    setRecommendationFood,
    videoId,
    setVideoId,
  } = useContext(RecipeContext);
  const [messageCopied, setMessageCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { id } = useParams();

  const inProgressKey = JSON.parse(localStorage.getItem('inProgressRecipes'));

  useEffect(() => {
    async function recipeFoodAPI() {
      const recipeAPI = await getDetailsFoodAPI(id);
      setRenderDetailsFood(recipeAPI.meals[0]);
    }

    async function recommendationAPI() {
      const recommendation = await getRecommendationFoodAPI();
      const recomendationAPILength = recommendation.drinks.slice(0, API_LENGTH);
      setRecommendationFood(recomendationAPILength);
    }
    recipeFoodAPI();
    recommendationAPI();
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
    setMeasureFood(measureValues);

    setVideoId(getYouTubeID(renderDetailsFood.strYoutube));
  }, [renderDetailsFood]);

  const opts = {
    height: '300',
    width: '300',
    playerVars: {
      autoplay: 0,
    },
  };

  function drinksCarousel() {
    return (
      <div className="container-carousel">
        <p>Recommendations to this recipe</p>
        <div className="carousel-scroll">
          {recommendationFood.map((drink, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recomendation-card` }
              className="carousel-card"
            >
              <img
                className="card-image"
                src={ drink.strDrinkThumb }
                alt="Compartilhar Receita"
              />
              <p className="card-name" data-testid={ `${index}-recomendation-title` }>
                {drink.strDrink}
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
    addRecipeLocalStorage(renderDetailsFood, 'Meal');
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

    if (inProgressKey && inProgressKey.meals[id]) {
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
        onClick={ () => history.push(`/foods/${id}/in-progress`) }
      >
        Start Recipe
      </button>
    );
  }

  return (
    <main>
      <img
        src={ renderDetailsFood.strMealThumb }
        style={ { width: '10%' } }
        alt="Foto da Receita"
        data-testid="recipe-photo"
      />
      <h3 data-testid="recipe-title">{renderDetailsFood.strMeal}</h3>
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
      <p data-testid="recipe-category">{renderDetailsFood.strCategory}</p>
      {measureFood.length > 0
        && measureFood.map((measure, index) => (
          <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {ingredientsFood[index]}
            {measure}
          </p>
        ))}
      <p data-testid="instructions">{renderDetailsFood.strInstructions}</p>
      <div data-testid="video">
        <YouTube videoId={ videoId } opts={ opts } />
      </div>
      {drinksCarousel()}
      {buttonRecipe()}
    </main>
  );
}

DetailsFood.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default DetailsFood;
