const { v4 } = require("uuid")
const { type } = require("../models/goodsModel")
const err = require("../errors/err")

class typeController {

    async create(req, res, next) {
        const { name } = req.body
        if (!name) {
            return next(err.badRequest("No type name!"))
        }
        const myType = new type({
            id: v4().toString(),
            name: name
        })
        await myType.save()
        return res.json(myType)
    }

    async getAll(req, res) {
        const myType = await type.find({})
        return res.json(myType)
    }

}

module.exports = new typeController()