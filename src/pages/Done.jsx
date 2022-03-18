import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

const TIMER_MESSAGE = 2000;

function Done() {
  const [doneRecipes, setDoneRecipes] = useState([]);
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
          { id, nationality, category, alcoholicOrNot, name, image, doneDate, tags, type,
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
              </div>
              <div
                data-testid={ `${index}-horizontal-name` }
                onClick={ () => history.push(`/${type}s/${id}`) }
                aria-hidden="true"
              >
                { name }
              </div>
              <div data-testid={ `${index}-horizontal-done-date` }>
                { `Feita em: ${doneDate}` }
              </div>
              <div>
                {tags.map((tag, indexTag) => (
                  <div
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                    key={ indexTag }
                  >
                    {tag}
                  </div>
                ))}
                <div>
                  { messageCopied && (<p><b>Link copied!</b></p>)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Done;
