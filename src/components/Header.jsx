import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../assets/css/Header.css';
import RecipeContext from '../context/RecipeContext';
import {
  getDrinksByIngredient,
  getDrinksByName,
  getDrinksByFirstLetter,
  getMealsByIngredient,
  getMealsByName,
  getMealsByFirstLetter,
} from '../services/radioAPI';

function Header(props) {
  const { title, mealsOrDrinks } = props;

  const history = useHistory();
  const toProfile = () => {
    history.push('/profile');
  };

  const [showBar, setShowBar] = useState(false);
  const [inputText, setInputText] = useState('');
  const [filter, setFilter] = useState('');
  const { setDrinksData, setMealsData } = useContext(RecipeContext);
  const firstLetterFilter = 'first-letter-search';
  const maxRecipes = 12;

  const getMeals = async () => {
    let response = '';
    if (filter === firstLetterFilter && inputText.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    if (filter === 'ingredient-search') {
      response = await getMealsByIngredient(inputText);
    }
    if (filter === 'name-search') {
      response = await getMealsByName(inputText);
    }
    if (filter === firstLetterFilter) {
      response = await getMealsByFirstLetter(inputText);
    }
    if (response !== null && filter !== '') {
      return setMealsData(response.slice(0, maxRecipes));
    }
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  };

  const getDrinks = async () => {
    let response = '';
    if (filter === firstLetterFilter && inputText.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    if (filter === 'ingredient-search') {
      response = await getDrinksByIngredient(inputText);
    }
    if (filter === 'name-search') {
      response = await getDrinksByName(inputText);
    }
    if (filter === firstLetterFilter) {
      response = await getDrinksByFirstLetter(inputText);
    }
    if (response !== null && filter !== '') {
      return setDrinksData(response.slice(0, maxRecipes));
    }
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  };

  const handleSubmit = () => {
    if (mealsOrDrinks === 'meals') {
      getMeals();
    } else {
      getDrinks();
    }
  };

  const handleInput = (e) => {
    const { value } = e.target;
    setInputText(value);
  };

  const filterRadio = (e) => {
    const { id } = e.target;
    setFilter(id);
  };

  const searchBar = () => (
    <div className="container-filters-bar">
      <div className="container-bar">
        <input
          placeholder="Search Recipe"
          className="bar"
          data-testid="search-input"
          value={ inputText }
          onChange={ handleInput }
        />
      </div>
      <section className="container-filters">
        <div className="filter-ingredient">
          <input
            className="ingredient-radio"
            type="radio"
            name="searchRadio"
            data-testid="ingredient-search-radio"
            id="ingredient-search"
            label="ingrediente"
            onChange={ filterRadio }
          />
          <p className="ingredient-title">Ingredient</p>
        </div>
        <div className="filter-name">
          <input
            className="name-radio"
            type="radio"
            name="searchRadio"
            data-testid="name-search-radio"
            id="name-search"
            label="nome"
            onChange={ filterRadio }
          />
          <p className="name-title">Name</p>
        </div>
        <div className="filter-first-letter">
          <input
            className="first-letter-radio"
            type="radio"
            name="searchRadio"
            data-testid="first-letter-search-radio"
            id="first-letter-search"
            label="primeiraLetra"
            onChange={ filterRadio }
          />
          <p className="first-letter-title">First Letter</p>
        </div>
        <button
          className="filter-btn"
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleSubmit }
        >
          Search
        </button>
      </section>
    </div>
  );

  return (
    <>
      <header className="container-header">
        <div className="header-search-title-profile">
          <button
            className="header-btn-search"
            type="button"
            onClick={ () => setShowBar(!showBar) }
          >
            <img
              data-testid="search-top-btn"
              className="btn-search-icon"
              src={ searchIcon }
              alt="searchIcon.svg"
            />
          </button>
          <div className="container-title">
            <h1 className="header-title" data-testid="page-title">{title}</h1>
            <div className="title-line" />
          </div>
          <button
            className="header-btn-profile"
            type="button"
            onClick={ toProfile }
          >
            <img
              className="btn-profile-icon"
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="profileIcon.svg"
            />
          </button>
        </div>
      </header>
      { showBar && searchBar() }
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  mealsOrDrinks: PropTypes.string,
}.isRequired;

export default Header;
