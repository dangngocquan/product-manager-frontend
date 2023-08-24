import configs from "../configs";

async function getSliders() {
    var apiURL = configs.api.root + `/sliders`;
    return fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
}

export default {
    getSliders
}