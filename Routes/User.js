const express = require('express')
const { SignUp, SignIn } = require('../Controllers/User')
const { signUpValidator, Validation } = require('../Middlewares/Validator')
const { isAuth } = require('../Middlewares/isAuth')

const userRouter = express.Router()

userRouter.post('/SignUp',signUpValidator,Validation, SignUp)

userRouter.post('/SignIn', SignIn)

userRouter.get('/currentUser',isAuth,(req, res)=> res.send(req.user))



module.exports = userRouter