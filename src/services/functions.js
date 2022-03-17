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

export function checkbokLocalStorage(id, type, ingredient) {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

  if (inProgressRecipes) {
    const { cocktails, meals } = inProgressRecipes;
    if (meals[id] && type === 'Meal') {
      return meals[id].find((e) => e === ingredient);
    }
    if (cocktails[id] && type === 'Drink') {
      return cocktails[id].find((e) => e === ingredient);
    }
    return false;
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify({
    cocktails: {},
    meals: {},
  }));
  return false;
}

function addIngredientLocalStorage(id, index, type) {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const { cocktails, meals } = inProgressRecipes;

  if (meals[id] && type === 'Meal') {
    const allIgredients = meals[id];
    console.log(allIgredients, '1');
    allIgredients.push(index);
    console.log(allIgredients, '2');
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails,
      meals: { ...meals },
    }));
  }

  if (cocktails[id] && type === 'Drink') {
    const allIgredients = cocktails[id];
    allIgredients.push(index);
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: { ...cocktails },
      meals,
    }));
  }

  if (!meals[id] && type === 'Meal') {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails,
      meals: { ...meals, [id]: [index] },
    }));
  }

  if (!cocktails[id] && type === 'Drink') {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: { ...cocktails, [id]: [index] },
      meals,
    }));
  }
}

function removeIngredientLocalStorage(id, index, inProgressRecipes, mealsOrCocktails) {
  const { cocktails, meals } = inProgressRecipes;
  if (mealsOrCocktails === 'meals') {
    console.log('caiu aqui');
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails,
      meals: { ...meals, [id]: meals[id].filter((e) => e !== index) },
    }));
  } else {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: { ...cocktails, [id]: cocktails[id].filter((e) => e !== index) },
      meals,
    }));
  }
}

export function addAndRemoveIngredient(id, index, type) {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const mealsOrCocktails = type === 'Meal' ? 'meals' : 'cocktails';

  if (inProgressRecipes[mealsOrCocktails][id]) {
    const removeIngredient = inProgressRecipes[mealsOrCocktails][id]
      .find((e) => e === index);
    if (removeIngredient) {
      removeIngredientLocalStorage(id, index, inProgressRecipes, mealsOrCocktails);
    } else {
      addIngredientLocalStorage(id, index, type);
    }
  } else {
    addIngredientLocalStorage(id, index, type);
  }
}
