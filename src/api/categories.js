import configs from "../configs";

async function getCategoryByLevel(level = 1, page = 0) {
    var apiURL = configs.api.root + `/categories/level/${level}/page/${page}`;
    return fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
}

// categories/tree/rootCategoryId/0
async function getCategoryTree(rootCategoryId = 0) {
    var apiURL = configs.api.root + `/categories/tree/rootCategoryId/${rootCategoryId}`;
    return fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
}

export default {
    getCategoryByLevel,
    getCategoryTree
}