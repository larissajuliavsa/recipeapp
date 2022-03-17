import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

const TIMER_MESSAGE = 2000;

function Favorites() {
  // const favoriteRecipes = [
  //   {
  //     id: '52771',
  //     type: 'food',
  //     nationality: 'Italian',
  //     category: 'Vegetarian',
  //     alcoholicOrNot: '',
  //     name: 'Spicy Arrabiata Penne',
  //     image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  //   },
  //   {
  //     id: '178319',
  //     type: 'drink',
  //     nationality: '',
  //     category: 'Cocktail',
  //     alcoholicOrNot: 'Alcoholic',
  //     name: 'Aquamarine',
  //     image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  //   },
  // ];

  // localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

  const [isFavorite, setIsFavorite] = useState([]);
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
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ handleClick }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => filter('food') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filter('drink') }
        >
          Drinks
        </button>
      </div>
      <div>
        {filterRecipe.map((
          { id, nationality, category, alcoholicOrNot, name, image, type,
          }, index,
        ) => (
          <div key={ id }>
            <img
              src={ image }
              alt={ `${name}` }
              data-testid={ `${index}-horizontal-image` }
              onClick={ () => history.push(`/${type}s/${id}`) }
              aria-hidden="true"
              width="200px"
            />
            <div>
              <div data-testid={ `${index}-horizontal-top-text` }>
                { nationality ? `${nationality} - ${category}` : `${alcoholicOrNot}` }
              </div>
              <div
                data-testid={ `${index}-horizontal-name` }
                onClick={ () => history.push(`/${type}s/${id}`) }
                aria-hidden="true"
              >
                { name }
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={ () => saveLinkClipBoard(type, id) }
              >
                <img
                  src={ shareIcon }
                  alt="Compartilhar Receita"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </button>
              <button
                type="button"
                onClick={ () => removeItem(id) }
              >
                <img
                  src={ blackHeartIcon }
                  alt="'Desfavoritar' Receita"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                />
              </button>
            </div>
            <div>
              { messageCopied && (<p><b>Link copied!</b></p>)}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Favorites;
