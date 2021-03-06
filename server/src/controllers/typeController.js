const { v4 } = require("uuid")
const { type } = require("../models/goodsModel")
const err = require("../errors/err")

class typeController {

    async create(req, res, next) {
        const { name } = req.body
        console.log(req.body)
        if (!name) {
            return next(err.badRequest("No type name!"))
        }
        const candidate = await type.findOne({ "name": name }).exec()
        if (candidate) {
            return next(err.badRequest("Such type already exist"))
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


    async delete(req, res, next) {
        const { deleteList } = req.body;
        deleteList?.forEach(async item => {
            await type.deleteOne({id: item}).exec();
        });
        res.send("Types deleted");
    }
}

module.exports = new typeController()