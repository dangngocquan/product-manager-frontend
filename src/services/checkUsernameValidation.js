function isUserNameValid(username) {
    // Check regex
    /* 
      Usernames can only have: 
      - Lowercase Letters (a-z) 
      - Uppercase Letters (A-Z) 
      - Numbers (0-9)
    */
    const res = /^[a-z0-9A-Z]+$/.exec(username);
    const valid = !!res;

    if (valid) {
        // Check existed username
        return {
            isValid: true,
            message: ""
        }
    } else {
        return {
            isValid: false,
            message: "Username can only have characters a-z, A-Z and 0-9."
        }
    }

    

    
}

export default isUserNameValid;