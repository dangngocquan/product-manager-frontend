import configs from "../configs";

async function getLastestProductsByCategoryId(categoryId = 0) {
    var apiURL = configs.api.root + `/products/lastest/categoryId/${categoryId}`;
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
    getProductInformationsById
}