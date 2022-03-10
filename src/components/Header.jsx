import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const history = useHistory();
  const toProfile = () => {
    history.push('/profile');
  };

  const [showBar, setShowBar] = useState(false);

  const searchBar = () => <input data-testid="search-input" />;

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
      <h1 data-testid="page-title">Page Title</h1>
      { showBar && searchBar() }
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
    </header>
  );
}

export default Header;
