const getRecommendationDrinkAPI = async () => {
  const request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const requestJSON = await request.json();
  return requestJSON;
};

export default getRecommendationDrinkAPI;
