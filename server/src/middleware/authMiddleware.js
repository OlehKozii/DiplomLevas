const jwt = require('jsonwebtoken');
const err = require("../errors/err")
const user = require("../models/userModel")

module.exports = async function checkAuth(req, res, next) {
    try {
        if (req.method === "OPTIONS") {
            next()
        }
        const token = req.header('Authorization')?.replace('Bearer ', '')?.trim();
        if (!token) {
            return next(err.unauthorized("Unauthorized1"));
        }
        const decoded = jwt.verify(token, process.env.secret)
        const candidate = await user.findOne({ "id": decoded.id, "name": decoded.name, "email": decoded.email, "role": decoded.role }).exec()
        if (!candidate) {
            return next(err.unauthorized("Unauthorized2"));
        }
        req.role = candidate.role;
        req.user = candidate;
        next();
    } catch (e) {
        console.log(e);
        return next(err.unauthorized("Unauthorized3"));
    }
}