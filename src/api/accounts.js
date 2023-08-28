import configs from "../configs";

async function login(data) {
    var apiURL = configs.api.root + `/accounts/login`;
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
    login
}