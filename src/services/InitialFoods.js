const CATEGORIES_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

export async function getMealCategories() {
  const categories = await fetch(CATEGORIES_URL)
    .then((response) => response.json())
    .then((data) => data.meals)
    .then((list) => list.map((item) => item.strCategory));
  return categories;
}

export async function getTwelveMeals() {
  const meals = fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
    .then((data) => data.meals);
  return meals;
}

export async function searchByMealCategories(category) {
  const categories = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
  )
    .then((response) => response.json())
    .then((data) => data.meals);
  return categories;
}

export async function getDrinkCategories() {
  const categories = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
    .then((response) => response.json())
    .then((data) => data.drinks)
    .then((list) => list.map((item) => item.strCategory));
  return categories;
}

export async function searchByDrinkCategories(category) {
  const categories = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((response) => response.json())
    .then((data) => data.drinks);
  return categories;
}

export async function getTwelveDrinks() {
  const drinks = fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
    .then((data) => data.drinks);
  return drinks;
}
