module.exports = async function checkRole(req, res, next) {
    const decoded = jwt_decode(req.header('Authorization').replace('Bearer ').trim())
    const candidate = await user.findOne({ "id": decoded.id, "name": decoded.name, "email": decoded.email, "role": decoded.role }).exec()
    if (!candidate) {
        return next(err.forbidden("Unauthorized"));
    }

    next();
}