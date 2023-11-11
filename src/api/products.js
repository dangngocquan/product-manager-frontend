import configs from "../configs";

async function getLastestProductsByCategoryId(categoryId = 0) {
    var apiURL = configs.api.root + `/products/lastest/categoryId/${categoryId}`;
    return fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
}

async function getProductsByCategoryId(categoryId = 0, page = 0) {
    if (categoryId == null || categoryId == undefined) categoryId = 0;
    var apiURL = configs.api.root + `/products/categoryId/${categoryId}/page/${page}`;
    return fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
}


async function getProductInformationsById(id = 1) {
    var apiURL = configs.api.root + `/products/id/${id}`;
    return fetch(apiURL);
}

export default {
    getLastestProductsByCategoryId,
    getProductsByCategoryId,
    getProductInformationsById
}