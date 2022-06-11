const cloudinary = require("../service/cloudinaryConfig")
const { upload } = require("../service/multer")
const { goods, params } = require("../models/goodsModel")
const err = require("../errors/err")
const { v4 } = require("uuid")
const { badRequest } = require("../errors/err")

class deviceController {

    async create(req, res, next) {
        try {
            const { name, price, state, typeID } = req.body;
            const file = req.file

            if (!file) {
                next(err.badRequest("No image"))
            }
            const result = await cloudinary.uploader.upload(file.path, { folder: "avatar" })
            const myDevice = new goods({
                id: v4().toString(),
                name: name,
                state: state,
                typeID: typeID,
                price: price,
                image: result.url
            })
            console.log(myDevice)
            if (req.body.info) {
                const info = JSON.parse(req.body.info)
                for (let i of info) {
                    if ((i.title && i.description) || (i.title === "" || i.description === ""))
                        myDevice.params.push({
                            title: i.title,
                            description: i.description
                        })
                    else {
                        next(err.badRequest("Ivalid"))
                    }

                }
            }
            myDevice.save()

            res.send(myDevice)
        } catch (e) {
            console.log(e)
            next(err.badRequest(e.message))
        }




    }

    async getOne(req, res, next) {
        const id = req.params.id
        const good = await goods.findOne({ id: id }).exec()
        if (!good) {
            return next(err.badRequest("No such device"))
        }
        return res.send(good)
    }

    async addComment(req, res, next) {
        const id = req.params.id;
        const { name, text } = req.body;
        const time = Date.now()
        const good = await goods.findOne({ id: id }).exec()
        if (!good) {
            return next(err.badRequest("No such device"))
        }
        good.comments.unshift({ name, text, time })
        good.save()
        return res.send(good)
    }

    async getAll(req, res) {
        const { state, typeID, discount } = req.query
        let filter
        console.log(req.query)
        try {
            if (!typeID && !state && !discount) {
                filter = await goods.find({}).exec()
            }
            if (typeID && state && discount) {
                filter = await goods.find({ state: state /*,discount*/, typeID: typeID }).exec()
            }
            if (state && !typeID && !discount) {
                filter = await goods.find({ state: state }).exec()
            }
            if (state && !typeID && discount) {
                filter = await goods.find({ state: state/*,discount*/ }).exec()
            }
            if (typeID && !state && discount) {
                filter = await goods.find({ typeID: typeID/*,discount*/ }).exec()
            }
            if (typeID && !state && !discount) {
                filter = await goods.find({ typeID: typeID }).exec()
            }
            if (!typeID && !state && discount) {
                filter = await goods.find({ /*,discount*/ }).exec()
            }
            return res.send(filter)
        } catch (e) {
            console.log(e)
            next(badRequest("Error"))
        }

    }

}

module.exports = new deviceController()