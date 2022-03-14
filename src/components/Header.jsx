import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

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
    <>
      <input
        data-testid="search-input"
        value={ inputText }
        onChange={ ({ target: { value } }) => setInputText(value) }
      />
      <input
        type="radio"
        name="searchRadio"
        data-testid="ingredient-search-radio"
        label="Ingrediente"
        onChange={ (e) => filterRadio(e) }
      />
      <input
        type="radio"
        name="searchRadio"
        data-testid="name-search-radio"
        label="Nome"
        onChange={ (e) => filterRadio(e) }
      />
      <input
        type="radio"
        name="searchRadio"
        data-testid="first-letter-search-radio"
        label="Primeira Letra"
        onChange={ (e) => filterRadio(e) }
      />
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => handleSubmit() }
      >
        Filtrar
      </button>
    </>
  );

  return (
    <header>
      <button
        type="button"
        onClick={ () => setShowBar(!showBar) }
      >
        <img
          data-testid="search-top-btn"
          src={ searchIcon }
          alt="searchIcon"
        />
      </button>
      <h1 data-testid="page-title">{title}</h1>
      <button
        type="button"
        onClick={ toProfile }
      >
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="profileIcon"
        />
      </button>
      { showBar && searchBar() }
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
