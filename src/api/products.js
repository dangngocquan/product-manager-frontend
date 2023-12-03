import configs from "../configs";

async function getLastestProductsByCategoryId(categoryId = 0) {
    var apiURL = configs.api.root + `/products/lastest/categoryId/${categoryId}`;
    return fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
}

async function getProductsByCategoryId(categoryId = 0, page = 0, order = 0, sortBy = "default") {
    if (categoryId == null || categoryId == undefined) categoryId = 0;
    if (page == null || page == undefined) page = 0;
    if (order == null || order == undefined) order = 0;
    if (sortBy == null || sortBy == undefined) sortBy = "default";
    var apiURL = configs.api.root + `/products/categoryId/${categoryId}/page/${page}/order/${order}/sortBy/${sortBy}`;
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