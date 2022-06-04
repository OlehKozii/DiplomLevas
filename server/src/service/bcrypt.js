const bcrypt = require('bcrypt')

const salt=6

const createHash= async (password)=>{
    return await bcrypt.hash(password, salt)
}

const compareHash= async (candidate, hash)=>{
    return await bcrypt.compareSync(candidate, hash, salt)
}

module.exports = {createHash, compareHash}