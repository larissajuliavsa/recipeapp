/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import RecipeContext from '../context/RecipeContext';
import getRecommendationDrinkAPI from '../services/recommendationDrinkAPI';

// import '../assets/DetailsFood.css';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import getDetailsDrinkAPI from '../services/detailsDrinkAPI';
// import blackHeartIcon from '../images/blackHeartIcon.svg';

const API_LENGTH = 6;

function DetailsDrink() {
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

  const { id } = useParams();

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

  function buttonRecipe() {
    const inProgressKey = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (inProgressKey) {
      return (
        <button className="btn-details" type="button" data-testid="start-recipe-btn">
          Continue Recipe
        </button>
      );
    }
    return (
      <button className="btn-details" type="button" data-testid="start-recipe-btn">
        Start Recipe
      </button>
    );
  }

  console.log(renderDetailsDrink);
  return (
    <main>
      <img
        src={ renderDetailsDrink.strDrinkThumb }
        style={ { width: '10%' } }
        alt="Foto do Drink"
        data-testid="recipe-photo"
      />
      <h3 data-testid="recipe-title">{renderDetailsDrink.strDrink}</h3>
      <button type="button" data-testid="share-btn">
        <img src={ shareIcon } alt="Compartilhar Receita" />
      </button>
      <button type="button" data-testid="favorite-btn">
        <img src={ whiteHeartIcon } alt="Favoritar Receita" />
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

export default DetailsDrink;
