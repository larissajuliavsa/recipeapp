import React, { useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import RecipeCard from '../components/recipeCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Drinks() {
  const { drinksData } = useContext(RecipeContext);

  return (
    <>
      { drinksData.length === 1
        && <Redirect to={ `/Drinks/${drinksData[0].idDrink}` } /> }
      <Header title="Drinks" />
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
