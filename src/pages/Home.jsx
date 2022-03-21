import React, { useContext, useEffect, useState } from 'react';
import React, { useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import RecipeCard from '../components/recipeCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeContext from '../context/RecipeContext';
import HomeCards from '../components/HomeCards';
import { maxListSize, maxNumberButton } from '../data/consts';
import {
  getTwelveMeals,
  getMealCategories,
  searchByMealCategories,
} from '../services/InitialFoods';

function Home() {
  const { foodsList, setFoodsList } = useContext(RecipeContext);
  const [mealCategories, setMealCategories] = useState([]);
  const [toggleFilter, setToggleFilter] = useState('');
  const getMeals = async () => {
    const meals = await getTwelveMeals();
    setFoodsList(meals);
    setMealCategories(await getMealCategories());
  };

  const handleClickFilter = async ({ target }) => {
    if (toggleFilter === target.textContent || target.textContent === 'All') {
      getMeals();
      setToggleFilter('');
    } else {
      setFoodsList(await searchByMealCategories(target.textContent));
      setToggleFilter(target.textContent);
    }
  };

  useEffect(() => {
    getMeals();
  }, []);

  const { mealsData } = useContext(RecipeContext);

  return (
    <>
      { mealsData.length === 1
        && <Redirect to={ `/Home/${mealsData[0].idMeal}` } /> }
      <Header title="Foods" />
      <div>
        <button
          type="button"
          onClick={ handleClickFilter }
          data-testid="All-category-filter"
        >
          All
        </button>
        {mealCategories.map((category, index) => (
          index <= maxNumberButton
          && (
            <button
              type="button"
              key={ category }
              data-testid={ `${category}-category-filter` }
              onClick={ handleClickFilter }
            >
              {category}
            </button>)
        ))}

      </div>
      <div>
        {foodsList.map((food, index) => (index <= maxListSize
        && (
          <Link to={ `/foods/${food.idMeal}` }>
            <HomeCards
              key={ food.idMeal }
              index={ index }
              strMealThumb={ food.strMealThumb }
              strMeal={ food.strMeal }
            />
          </Link>)
        ))}
      </div>
      { mealsData !== [] && mealsData.map((recipe, index) => (
        <section className="container-home" key={ recipe.idMeal }>
          <Link to={ `/Home/${recipe.idMeal}` }>
            <RecipeCard recipe={ recipe } index={ index } />
          </Link>
        </section>
      )) }
      <Footer />
    </>
  );
}

export default Home;
