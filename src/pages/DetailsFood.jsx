/* eslint-disable import/no-unresolved */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';

import RecipeContext from '../context/RecipeContext';
import Header from '../components/Header';
import getDetailsFoodAPI from '../services/detailsFoodAPI';
import getRecommendationFoodAPI from '../services/recommendationFoodAPI';

import '../assets/css/DetailsFood.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
const getYouTubeID = require('get-youtube-id');

const API_LENGTH = 6;

function DetailsFood() {
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

  const { id } = useParams();

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
    height: '250',
    width: '300',
    playerVars: {
      autoplay: 0,
    },
  };

  function drinksCarousel() {
    return (
      <div className="container-carousel">
        <p className="carousel-title">Recommendations</p>
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
              <p
                className="card-name"
                data-testid={ `${index}-recomendation-title` }
              >
                {drink.strDrink}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function buttonRecipe() {
    const inProgressKey = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (inProgressKey) {
      return (
        <button
          className="btn-details"
          type="button"
          data-testid="start-recipe-btn"
        >
          Continue Recipe
        </button>
      );
    }
    return (
      <button
        className="btn-details"
        type="button"
        data-testid="start-recipe-btn"
      >
        Start Recipe
      </button>
    );
  }

  return (
    <>
      <header>
        <Header />
      </header>
      <main className="container-details-food">
        <img
          src={ renderDetailsFood.strMealThumb }
          className="details-image-recipe"
          alt="Foto da Receita"
          data-testid="recipe-photo"
        />
        <div className="container-recipe-introduction">
          <button className="btn-share" type="button" data-testid="share-btn">
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
            data-testid="favorite-btn"
          >
            <img
              className="favorite-icon"
              src={ whiteHeartIcon }
              alt="Favoritar Receita"
            />
          </button>
        </div>
        <div className="container-ingredient">
          {measureFood.length > 0
            && measureFood.map((measure, index) => (
              <p
                className="ingredient-measure"
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {ingredientsFood[index]}
                {' '}
                <span>{measure}</span>
              </p>
            ))}
        </div>
        <div className="container-instructions">
          <p data-testid="instructions">{renderDetailsFood.strInstructions}</p>
        </div>
        <div className="video-youtube" data-testid="video">
          <YouTube videoId={ videoId } opts={ opts } />
        </div>
        {drinksCarousel()}
        {buttonRecipe()}
      </main>
    </>
  );
}

export default DetailsFood;
