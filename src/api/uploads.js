import configs from "../configs";

async function uploadImage(image) {
    var apiURL = configs.api.root + `/uploads`;
    const options = {
        method: "POST",
        enctype: "multipart/form-data",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(image),
    }
    return fetch(apiURL, options);
}

export default {
    uploadImage
}