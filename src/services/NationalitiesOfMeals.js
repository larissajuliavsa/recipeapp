export default async function getNationalitiesOfMeal() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const nationalities = await response.json();
  return nationalities;
}
