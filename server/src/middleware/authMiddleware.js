const jwt = require('jsonwebtoken');
const err = require("../errors/err")
const user = require("../models/userModel")

module.exports = async function checkAuth(req, res, next) {
    try {
        const token = req.header('Authorization')?.replace('Bearer ')?.trim();
        if (!token) {
            return next(err.forbidden("Unauthorized"));
        }
        const decoded = jwt.verify(token, process.env.secret)
        const candidate = await user.findOne({ "id": decoded.id, "name": decoded.name, "email": decoded.email, "role": decoded.role }).exec()
        if (!candidate) {
            return next(err.forbidden("Unauthorized"));
        }
        req.role = candidate.role;
        next();
    } catch (e) {
        return next(err.forbidden("Unauthorized"));
    }
}