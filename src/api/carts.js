import configs from "../configs";

async function getProducts(token) {
    var apiURL = configs.api.root + `/carts/products`;
    const data = {
        "token": token
    }
    const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }
    return fetch(apiURL, options);
}


async function addProduct(token, productId, productVariantId) {
    var apiURL = configs.api.root + `/carts`;
    const data = {
        "token": token,
        "productId": productId,
        "productVariantId": productVariantId
    }
    const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }
    return fetch(apiURL, options);
}

export default {
    getProducts,
    addProduct
}