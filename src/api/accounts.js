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

async function loginWithGoogle(data) {
  var apiURL = configs.api.root + `/accounts/login/google`;
  const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  return fetch(apiURL, options);
}

async function signUp(data) {
  var apiURL = configs.api.root + `/accounts`;
  const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  return fetch(apiURL, options);
}

async function signUpWithGoogle(data) {
  var apiURL = configs.api.root + `/accounts/new/google`;
  const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  return fetch(apiURL, options);
}

async function getInformations(data) {
  var apiURL = configs.api.root + `/accounts/informations`;
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
    login,
    loginWithGoogle,
    signUp,
    signUpWithGoogle,
    getInformations
}