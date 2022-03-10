const getRecommendationFoodAPI = async () => {
  const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const requestJSON = await request.json();
  return requestJSON;
};

export default getRecommendationFoodAPI;
