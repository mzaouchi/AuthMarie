const User = require('../Models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.SignUp = async(req,res)=>{
    try {
        const {name, email, password} = req.body

        const found = await User.findOne({email})

        if (found) {
            return res.status(400).send({errors : [{msg : "Email already exists"}]})
        }

        const nouveau = new User(req.body)

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);

        nouveau.password = hashedPassword

        await nouveau.save()

        const payload = { id: nouveau._id }
        var token = jwt.sign(payload, process.env.privateKey);

        res.status(200).send({msg : "Account created", nouveau, token})

    } catch (error) {
        res.status(500).send({errors : [{msg : "Could not create account"}]})
    }
}

exports.SignIn = async(req,res)=>{
    try {
        const {email, password} = req.body

        const found = await User.findOne({email})

        if (!found) {
            return res.status(400).send({errors : [{msg : "Wrong email"}]})
        }

        const matched = bcrypt.compareSync(password, found.password)

        if (!matched) {
            return res.status(400).send({errors : [{msg : "Wrong password"}]})
        }

        const payload = { id: found._id }
        var token = jwt.sign(payload, process.env.privateKey);

        res.status(200).send({msg : "Connected", found, token})
    } catch (error) {
        res.status(500).send({errors : [{msg : "Could not connect"}]})
    }
}