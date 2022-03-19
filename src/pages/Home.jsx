import React, { useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import RecipeCard from '../components/recipeCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Home() {
  const { mealsData } = useContext(RecipeContext);

  return (
    <>
      { mealsData.length === 1
        && <Redirect to={ `/Home/${mealsData[0].idMeal}` } /> }
      <Header title="Foods" />
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
