export default async function getAllRecipesOfMeal() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  const ingredients = await response.json();
  return ingredients;
}
