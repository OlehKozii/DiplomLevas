require('dotenv').config()
const jwt = require("jsonwebtoken")

const generateToken=(id, email, role)=>{
    return jwt.sign(
        {id, email, role},
        process.env.secret,
        {expiresIn:12*60}
    )
}

module.exports = generateToken