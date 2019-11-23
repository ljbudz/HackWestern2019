var request = require("request");

function getRecipes(ingredients) {
  var params = {
    apiKey: "41382040abdc466b8057b63189fd03e6",
    ranking: 2,
    number: 5,
    ingredients: ingredients
  };

  const makeRequest = params => {
    let queryUrl = "https://api.spoonacular.com/recipes/findByIngredients?";

    for (let key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        queryUrl += createUrlParamString(key, params[key]);
      }
    }

    request(queryUrl, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const parsedData = JSON.parse(body);
        return parsedData;
      } else {
        return error;
      }
    });
  };

  const createUrlParamString = (name, params) => {
    if (typeof params == "object") {
      let result = "&" + name + "=" + params[0];
      for (let i = 1; i < params.length; i++) {
        result += ",+" + params[i];
      }
      return result;
    }
    return "&" + name + "=" + params;
  };
}

modules.exports = getRecipes;
