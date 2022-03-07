import React from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './RecipeContext';

function RecipeProvider({ children }) {
  const valueProvider = {};

  return (
    <RecipeContext.Provider value={ valueProvider }>
      {children}
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default RecipeProvider;
