import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';

function Explorer({ history }) {
  const btnRedirectRoute = (route) => {
    history.push(`/explore/${route}`);
  };

  return (
    <div>
      <span>Tela Explore na rota /explorer</span>
      <button
        type="button"
        data-testid="explore-foods"
        onClick={ () => btnRedirectRoute('foods') }
      >
        Explore Foods
      </button>
      <button
        type="button"
        data-testid="explore-drinks"
        onClick={ () => btnRedirectRoute('drinks') }
      >
        Explore Drinks
      </button>
      <Footer />
    </div>
  );
}

Explorer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Explorer;
