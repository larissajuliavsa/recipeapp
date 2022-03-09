import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';

function ExplorerTypes({ history }) {
  const btnExplore = (route) => {
    history.push(`/explore/${route}`);
  };

  return (
    <div>
      <span>Tela ExploreTypes na rota /explorer/:foodsAndDrinks</span>
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => btnExplore('foods') }
      >
        By Ingredient
      </button>
      <button
        type="button"
        data-testid="explore-by-nationality"
        onClick={ () => btnExplore('drinks') }
      >
        By Nationality
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => btnExplore('drinks') }
      >
        Surprise me!
      </button>
      <Footer />
    </div>
  );
}

ExplorerTypes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ExplorerTypes;
