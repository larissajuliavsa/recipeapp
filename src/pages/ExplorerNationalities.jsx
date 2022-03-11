import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import getNationalitiesOfMeal from '../services/NationalitiesOfMeals';

// const QUANTITY_OF_INGREDIENTS = 12;

function ExplorerNationalities() {
  // const { history } = props;props

  const [nationalities, setNationalities] = useState([]);
  const [nationalitiesDropdown, setNationalitiesDropdown] = useState('');

  //   const selectIngredients = (list) => {
  //     const listFilter = list.filter((_e, i) => i < QUANTITY_OF_INGREDIENTS);
  //     return listFilter;
  //   };

  useEffect(() => {
    const requestAllNationalities = async () => {
      const { meals } = await getNationalitiesOfMeal();

      setNationalities(meals);
      // const listMeals = selectIngredients(meals);
      // const listDrinks = selectIngredients(drinks);

      // setIngredientsMeals(listMeals);
      // setIngredientsDrinks(listDrinks);
    };
    requestAllNationalities();
  }, []);

  console.log(nationalities);
  // const renderCard = (array, str) => (
  //   array.map((e, i) => (
  //     <CardIngredients
  //       key={ i }
  //       ingredient={ e[str] }
  //       index={ i }
  //       history={ history }
  //       params={ foodsAndDrinks }
  //     />
  //   ))
  // );

  return (
    <div>
      <span>tela explorer nationalites</span>
      <label htmlFor="explore-by-nationality-dropdown">
        Nacionalidade:
        <select
          data-testid="explore-by-nationality-dropdown"
          id="explore-by-nationality-dropdown"
          name="nationality"
          value={ nationalitiesDropdown }
          onChange={ ({ target }) => setNationalitiesDropdown(target.value) }
        >
          {nationalities.map(({ strArea }) => (
            <option
              key={ strArea }
              data-testid={ `${strArea}-option` }
              id={ strArea }
            >
              { strArea }
            </option>
          ))}
        </select>
      </label>
      <Footer />
    </div>
  );
}

ExplorerNationalities.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  // params: PropTypes.shape(),
}.isRequired;

export default ExplorerNationalities;
