import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import '../assets/css/Done.css';

const copy = require('clipboard-copy');

const TIMER_MESSAGE = 2000;

function Done() {
  const [doneRecipes, setDoneRecipes] = useState(JSON
    .parse(localStorage.getItem('favoriteRecipes')));
  const [filterRecipe, setFilterRecipe] = useState([]);
  const [messageCopied, setMessageCopied] = useState(false);

  const history = useHistory();

  const handleClick = () => {
    const doneRecipesLocalStorage = localStorage.getItem('doneRecipes');
    setDoneRecipes(JSON.parse(doneRecipesLocalStorage));
    setFilterRecipe(JSON.parse(doneRecipesLocalStorage));
  };

  useEffect(() => {
    handleClick();
  }, []);

  const filter = (type) => {
    const doneRecipesFiltered = doneRecipes.filter((recipe) => recipe.type === type);
    setFilterRecipe(doneRecipesFiltered);
  };

  function saveLinkClipBoard(type, id) {
    copy(`http://localhost:3000/${type}s/${id}`);
    setMessageCopied(true);
    const setIntervalId = setInterval(() => {
      clearInterval(setIntervalId);
      setMessageCopied(false);
    }, TIMER_MESSAGE);
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
          { id, nationality, category, alcoholicOrNot, name, image, doneDate, tags, type,
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
              { nationality ? `${nationality} ${category}` : `${alcoholicOrNot}` }
            </p>
            {tags.map((tag, indexTag) => (
              <p
                className="favorite-tag"
                data-testid={ `${index}-${tag}-horizontal-tag` }
                key={ indexTag }
              >
                {tag}
              </p>
            ))}
            <p
              className="favorite-name"
              data-testid={ `${index}-horizontal-name` }
              onClick={ () => history.push(`/${type}s/${id}`) }
              aria-hidden="true"
            >
              { name }
            </p>
            <p
              className="favorite-date"
              data-testid={ `${index}-horizontal-done-date` }
            >
              { doneDate }
            </p>
            <button
              className="favorite-btn"
              type="button"
              onClick={ () => saveLinkClipBoard(type, id) }
            >
              <img
                src={ shareIcon }
                alt="Compartilhar Receita"
                data-testid={ `${index}-horizontal-share-btn` }
              />
              { messageCopied && <p className="btn-share-copied">Link copied!</p> }
            </button>
          </section>
        ))}
      </section>
    </>
  );
}

export default Done;
