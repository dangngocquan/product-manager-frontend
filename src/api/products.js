import configs from "../configs";

async function getLastestProductsByCategoryId(categoryId = 0) {
    var apiURL = configs.api.root + `/products/lastest/categoryId/${categoryId}`;
    return fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
}

export default {
    getLastestProductsByCategoryId
}