const getDetailsFoodAPI = async (id) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const requestJSON = await request.json();
  return requestJSON;
};

export default getDetailsFoodAPI;
