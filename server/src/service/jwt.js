require('dotenv').config()
const jwt = require("jsonwebtoken")

const generateToken = (id, email, name, role) => {
    return jwt.sign(
        { id, email, name, role },
        process.env.secret,
        { expiresIn: 12 * 60 * 60 }
    )
}

module.exports = generateToken