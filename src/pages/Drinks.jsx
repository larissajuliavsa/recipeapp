import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

  return (
    <>
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
      <Footer />
    </>
  );
}

export default Drinks;
