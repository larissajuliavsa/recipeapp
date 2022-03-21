import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../assets/css/Done.css';

const copy = require('clipboard-copy');

const TIMER_MESSAGE = 2000;

function Favorites() {
  const [isFavorite, setIsFavorite] = useState(JSON
    .parse(localStorage.getItem('favoriteRecipes')));
  const [filterRecipe, setFilterRecipe] = useState([]);
  const [messageCopied, setMessageCopied] = useState(false);

  const history = useHistory();

  const handleClick = () => {
    const favoriteRecipesLocalStorage = localStorage.getItem('favoriteRecipes');
    setIsFavorite(JSON.parse(favoriteRecipesLocalStorage));
    setFilterRecipe(JSON.parse(favoriteRecipesLocalStorage));
  };

  useEffect(() => {
    handleClick();
  }, []);

  const filter = (type) => {
    const favRecipesFiltered = isFavorite.filter((recipe) => recipe.type === type);
    setFilterRecipe(favRecipesFiltered);
  };

  function saveLinkClipBoard(type, id) {
    copy(`http://localhost:3000/${type}s/${id}`);
    setMessageCopied(true);
    const setIntervalId = setInterval(() => {
      clearInterval(setIntervalId);
      setMessageCopied(false);
    }, TIMER_MESSAGE);
  }

  function removeItem(id) {
    const getFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favorites = getFavorites.filter((favorite) => favorite.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
    setFilterRecipe(favorites);
  }

  return (
    <>
      <Header />
      <section className="container-filter-btns">
        <button
          className="filter-all"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ handleClick }
        >
          All
        </button>
        <button
          className="filter-food"
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => filter('food') }
        >
          Food
        </button>
        <button
          className="filter-drink"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filter('drink') }
        >
          Drinks
        </button>
      </section>
      <section className="container-grid">
        {filterRecipe && filterRecipe.map((
          { id, nationality, category, alcoholicOrNot, name, image, type,
          }, index,
        ) => (
          <section className="container-favorite" key={ id }>
            <img
              className="favorite-img"
              src={ image }
              alt={ `${name}` }
              data-testid={ `${index}-horizontal-image` }
              onClick={ () => history.push(`/${type}s/${id}`) }
              aria-hidden="true"
            />
            <p
              className="favorite-category"
              data-testid={ `${index}-horizontal-top-text` }
            >
              { nationality ? `${nationality} - ${category}` : `${alcoholicOrNot}` }
            </p>
            <p
              className="favorite-name"
              data-testid={ `${index}-horizontal-name` }
              onClick={ () => history.push(`/${type}s/${id}`) }
              aria-hidden="true"
            >
              { name }
            </p>
            <div className="container-btns">
              <button
                className="favorite-btn"
                type="button"
                onClick={ () => saveLinkClipBoard(type, id) }
              >
                <img
                  className="icon-share"
                  src={ shareIcon }
                  alt="Compartilhar Receita"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
                { messageCopied && <p className="btn-share-copied">Link copied!</p> }
              </button>
              <button
                className="favorite-heart"
                type="button"
                onClick={ () => removeItem(id) }
              >
                <img
                  className="icon-heart"
                  src={ blackHeartIcon }
                  alt="'Desfavoritar' Receita"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                />
              </button>
            </div>
          </section>
        ))}
      </section>
    </>
  );
}

export default Favorites;
