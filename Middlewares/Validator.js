const { body, validationResult } = require('express-validator');

exports.signUpValidator = [
    body("email", "Wrong format email").isEmail(),
    body("password", "Your password must contain 8 char").isLength({min : 8})
]


exports.Validation=(req,res,next)=>{
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).send(errors)
    }

    next()
}
