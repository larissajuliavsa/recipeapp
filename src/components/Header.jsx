import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../assets/css/Header.css';

function Header(props) {
  const { title } = props;

  const history = useHistory();
  const toProfile = () => {
    history.push('/profile');
  };

  const [showBar, setShowBar] = useState(false);
  const [inputText, setInputText] = useState('');
  const [filter, setFilter] = useState('ingredient');

  const handleSubmit = () => {
    if (filter === 'first-letter') {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  function filterRadio(e) {
    const { value } = e.target;
    setFilter(value);
  }

  const searchBar = () => (
    <div className="container-filters-bar">
      <div className="container-bar">
        <input
          placeholder="Search Recipe"
          className="bar"
          data-testid="search-input"
          value={ inputText }
          onChange={ ({ target: { value } }) => setInputText(value) }
        />
      </div>
      <section className="container-filters">
        <div className="filter-ingredient">
          <input
            className="ingredient-radio"
            type="radio"
            name="searchRadio"
            data-testid="ingredient-search-radio"
            label="ingrediente"
            onChange={ (e) => filterRadio(e) }
          />
          <p className="ingredient-title">Ingredient</p>
        </div>
        <div className="filter-name">
          <input
            className="name-radio"
            type="radio"
            name="searchRadio"
            data-testid="name-search-radio"
            label="nome"
            onChange={ (e) => filterRadio(e) }
          />
          <p className="name-title">Name</p>
        </div>
        <div className="filter-first-letter">
          <input
            className="first-letter-radio"
            type="radio"
            name="searchRadio"
            data-testid="first-letter-search-radio"
            label="primeiraLetra"
            onChange={ (e) => filterRadio(e) }
          />
          <p className="first-letter-title">First Letter</p>
        </div>
        <button
          className="filter-btn"
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => handleSubmit() }
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
              className="btn-search-icon"
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="searchIcon"
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
              alt="profileIcon"
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
}.isRequired;

export default Header;
