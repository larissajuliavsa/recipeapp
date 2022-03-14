const MEAL_BY_INGREDIENT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const MEAL_BY_NAME = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const MEAL_BY_FIRST_LETTER = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

async function getApiByIngredient(ingredient, callback) {
  try {
    const results = await fetch(`${MEAL_BY_INGREDIENT}${ingredient}`)
      .then((res) => res.json());
    callback(results.meals);
  } catch (error) {
    console.error(error);
  }
}

async function getApiByName(nome, callback) {
  try {
    const results = await fetch(`${MEAL_BY_NAME}${nome}`).then((res) => res.json());
    callback(results.meals);
  } catch (error) {
    console.error(error);
  }
}

async function getApiByFirstLetter(firstLetter, callback) {
  try {
    const results = await fetch(`${MEAL_BY_FIRST_LETTER}${firstLetter}`)
      .then((res) => res.json());
    callback(results.meals);
  } catch (error) {
    console.error(error);
  }
}

function FetchApiFoods(searchText, searchRadio, setSearchRecipes) {
  switch (searchRadio) {
  case 'ingredient':
    getApiByIngredient(searchText, setSearchRecipes);
    break;
  case 'name':
    getApiByName(searchText, setSearchRecipes);
    break;
  case 'first-letter':
    if (searchText.length === 1) {
      getApiByFirstLetter(searchText, setSearchRecipes);
    } else {
      global.alert('Your search must have only 1 (one) character');
    }
    break;
  default:
    break;
  }
}

export default FetchApiFoods;
