const jwt = require('jsonwebtoken');
const err = require("../errors/err")
const user = require("../models/userModel")

module.exports = async function checkRole(req, res, next) {
    try {
        if (req.method === "OPTIONS") {
            next()
        }
        if (req.role !== "admin") {
            return next(err.forbidden("Dont have access"));
        }
        next();
    } catch (e) {
        return next(err.forbidden("Unauthorized"));
    }
}