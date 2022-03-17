/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';

import RecipeContext from '../context/RecipeContext';
import getRecommendationDrinkAPI from '../services/recommendationDrinkAPI';

import {
  addRecipeLocalStorage,
  checkLocalStorage,
  removeRecipeLocalStorage } from '../services/functions';

import '../assets/css/Details.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import getDetailsDrinkAPI from '../services/detailsDrinkAPI';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import backIcon from '../images/backIcon.svg';

const copy = require('clipboard-copy');

const API_LENGTH = 6;
const TIMER_MESSAGE = 2000;

function DetailsDrink() {
  const location = useLocation();

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
  const history = useHistory();

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
        <p className="carousel-title">Recommendations</p>
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
    copy(`http://localhost:3000${location.pathname}`);
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
    <>
      <button
        onClick={ () => history.push('/drinks') }
        type="button"
        className="btn-back-home"
      >
        <img src={ backIcon } alt="Back to search home" />
        <p className="btn-home-name">Drinks</p>
      </button>
      <main className="container-details-main">
        <img
          className="details-image-recipe"
          src={ renderDetailsDrink.strDrinkThumb }
          alt="Foto do Drink"
          data-testid="recipe-photo"
        />
        <div className="container-recipe-introduction">
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
            { messageCopied && <p className="btn-share-copied">Link copied!</p>}
          </button>
          <div className="recipe-name-category">
            <h3
              className="recipe-name"
              data-testid="recipe-title"
            >
              {renderDetailsDrink.strDrink}
            </h3>
            <div className="recipe-line" />
            <p
              className="recipe-category"
              data-testid="recipe-category"
            >
              {renderDetailsDrink.strAlcoholic}
            </p>
          </div>
          <button
            className="btn-favorite"
            type="button"
            onClick={
              isFavorite
                ? removeRecipeFavorite
                : addRecipeFavorite
            }
          >
            <img
              className="favorite-icon"
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="Favoritar Receita"
              data-testid="favorite-btn"
            />
          </button>
        </div>
        {/* <p data-testid="recipe-category">{renderDetailsDrink.strAlcoholic}</p> */}
        <div className="container-ingredient">
          {measureDrink.length > 0
            && measureDrink.map((measure, index) => (
              <p
                className="ingredient-measure"
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {ingredientsDrink[index]}
                {' '}
                <span>{measure}</span>
              </p>
            ))}
        </div>
        <div className="container-instructions">
          <p data-testid="instructions">{renderDetailsDrink.strInstructions}</p>
        </div>
        {mealsCarousel()}
        {buttonRecipe()}
      </main>
    </>
  );
}

export default DetailsDrink;
