function isPasswordValid(password) {
    // Check regex
    /* 
      Password can only have: 
      - Lowercase Letters (a-z) 
      - Uppercase Letters (A-Z) 
      - Numbers (0-9)
    */
    const res = /^[a-z0-9A-Z]+$/.exec(password);
    const valid = !!res;

    if (valid) {
        return {
            isValid: true,
            message: ""
        }
    } else {
        return {
            isValid: false,
            message: "Password can only have characters a-z, A-Z and 0-9."
        }
    }

    

    
}

export default isPasswordValid;