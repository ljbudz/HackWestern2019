var axios = require("axios");

export function getRecipes(items) {
    var params = {
        apiKey: "4e090e0e8eb14bc3b43d1ae65b48cf88",
        ranking: 2,
        number: 10,
        ingredients: items
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

    let queryUrl = "https://api.spoonacular.com/recipes/findByIngredients?";
    for (let key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
            queryUrl += createUrlParamString(key, params[key]);
        }
    }

    return axios.get(queryUrl).then(response => {
        return response.data;
    });
}
