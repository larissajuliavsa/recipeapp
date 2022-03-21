import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeContext from '../context/RecipeContext';
import HomeCard from '../components/HomeCards';
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

  return (
    <>
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
            <HomeCard
              key={ food.idMeal }
              index={ index }
              image={ food.strMealThumb }
              name={ food.strMeal }
            />
          </Link>)
        ))}
      </div>
      <Footer />
    </>
  );
}

export default Home;
