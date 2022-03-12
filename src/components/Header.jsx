import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../assets/css/Header.css';

function Header() {
  const history = useHistory();
  const toProfile = () => {
    history.push('/profile');
  };

  const [showBar, setShowBar] = useState(false);

  const searchBar = () => (
    <>
      <input data-testid="search-input" />
      <input
        type="radio"
        name="searchRadio"
        data-testid="ingredient-search-radio"
        label="Ingrediente"
      />
      <input
        type="radio"
        name="searchRadio"
        data-testid="name-search-radio"
        label="Nome"
      />
      <input
        type="radio"
        name="searchRadio"
        data-testid="first-letter-search-radio"
        label="Primeira Letra"
      />
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Filtrar
      </button>
    </>
  );

  return (
    <header className="container-header">
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
        <h1 className="header-title" data-testid="page-title">Nome App</h1>
        <div className="title-line" />
      </div>
      { showBar && searchBar() }
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
    </header>
  );
}

export default Header;
