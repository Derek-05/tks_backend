//Cree los errores, solo funcionan para el sign in y log in porque no se los implementé a los aplicantes todavia

class ErrorResponse extends Error{
    constructor(message, codeStatus){
        super(message);
        this.codeStatus = codeStatus;
    }
}

module.exports = ErrorResponse;