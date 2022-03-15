export function addRecipeLocalStorage(details, type) {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const {
    [`id${type}`]: id,
    strArea,
    strCategory,
    strAlcoholic,
    [`str${type}`]: name,
    [`str${type}Thumb`]: image,
  } = details;

  const currentRecipe = {
    id,
    type: type === 'Drink' ? 'drink' : 'food',
    nationality: type === 'Meal' ? strArea : '',
    category: strCategory,
    alcoholicOrNot: type === 'Drink' ? strAlcoholic : '',
    name,
    image,
  };

  if (favoriteRecipes && favoriteRecipes.length > 0) {
    localStorage.setItem('favoriteRecipes', JSON.stringify(
      [...favoriteRecipes, currentRecipe],
    ));
  }

  if (!favoriteRecipes || favoriteRecipes.length === 0) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([currentRecipe]));
  }
}

export function removeRecipeLocalStorage(id) {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const newFavoriteRecipes = favoriteRecipes.filter((e) => e.id !== id);

  localStorage.setItem('favoriteRecipes', JSON.stringify([...newFavoriteRecipes]));
}

export function checkLocalStorage(id) {
  const favoriteKeys = JSON.parse(localStorage.getItem('favoriteRecipes'));

  if (favoriteKeys && favoriteKeys.length > 0) {
    return favoriteKeys.find((e) => e.id === id);
  }
  return false;
}
