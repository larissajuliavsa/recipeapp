import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import '../assets/css/Explorer.css';
import Header from '../components/Header';

function Explorer({ history }) {
  const btnRedirectRoute = (route) => {
    history.push(`/explore/${route}`);
  };

  return (
    <div>
      <Header title="Explore" />
      {/* <span>Tela Explore na rota /explorer</span> */}
      <section className="container-explorer">
        <button
          className="explorer-foods"
          type="button"
          data-testid="explore-foods"
          onClick={ () => btnRedirectRoute('foods') }
        >
          Explore Foods
        </button>
        <button
          className="explorer-drinks"
          type="button"
          data-testid="explore-drinks"
          onClick={ () => btnRedirectRoute('drinks') }
        >
          Explore Drinks
        </button>
      </section>
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
