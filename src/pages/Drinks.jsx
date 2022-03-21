import React, { useContext, useEffect, useState } from 'react';
import React, { useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import RecipeCard from '../components/recipeCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeContext from '../context/RecipeContext';
import DrinkCards from '../components/DrinkCards';
import { maxListSize, maxNumberButton } from '../data/consts';
import {
  getTwelveDrinks,
  getDrinkCategories,
  searchByDrinkCategories,
} from '../services/InitialFoods';

function Drinks() {
  const { drinksList, setDrinksList } = useContext(RecipeContext);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [toggleFilter, setToggleFilter] = useState('');
  const getDrinks = async () => {
    const drinks = await getTwelveDrinks();
    setDrinksList(drinks);
    setDrinkCategories(await getDrinkCategories());
  };

  const handleClickFilter = async ({ target }) => {
    if (toggleFilter === target.textContent || target.textContent === 'All') {
      getDrinks();
      setToggleFilter('');
    } else {
      setDrinksList(await searchByDrinkCategories(target.textContent));
      setToggleFilter(target.textContent);
    }
  };

  useEffect(() => {
    getDrinks();
  }, []);
  
  const { drinksData } = useContext(RecipeContext);

  return (
    <>
      { drinksData.length === 1
        && <Redirect to={ `/Drinks/${drinksData[0].idDrink}` } /> }
      <Header title="Drinks" />
      <div>
        <button
          type="button"
          onClick={ handleClickFilter }
          data-testid="All-category-filter"
        >
          All
        </button>
        {drinkCategories.map((category, index) => (
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
        {drinksList.map((drink, index) => (index <= maxListSize
        && (
          <Link to={ `/drinks/${drink.idDrink}` }>
            <DrinkCards
              key={ drink.idDrink }
              index={ index }
              strDrinkThumb={ drink.strDrinkThumb }
              strDrink={ drink.strDrink }
            />
          </Link>)
        ))}
      </div>
      { drinksData !== [] && drinksData.map((recipe, index) => (
        <section className="container-drinks" key={ recipe.idDrink }>
          <Link to={ `/Drinks/${recipe.idDrink}` }>
            <RecipeCard recipe={ recipe } index={ index } />
          </Link>
        </section>
      )) }
      <Footer />
    </>
  );
}

export default Drinks;
