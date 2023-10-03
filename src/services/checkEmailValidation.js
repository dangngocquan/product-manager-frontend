function isEmailValid(email) {
    // Check regex

    const res = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.exec(email);
    const valid = !!res;

    if (valid) {
        return {
            isValid: true,
            message: ""
        }
    } else {
        return {
            isValid: false,
            message: "Invalid email."
        }
    }

    

    
}

export default isEmailValid;