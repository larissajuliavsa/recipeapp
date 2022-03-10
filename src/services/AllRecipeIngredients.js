export async function getIngredientsOfMeal() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  const ingredients = await response.json();
  return ingredients;
}

export async function getIngredientsOfDrink() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
  const ingredients = await response.json();
  return ingredients;
}
