import configs from "../configs";

async function getCategoryByLevel(level = 1, page = 0) {
    var apiURL = configs.api.root + `/categories/level/${level}/page/${page}`;
    return fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
}

export default {
    getCategoryByLevel
}