const cloudinary = require("../service/cloudinaryConfig")
const { upload } = require("../service/multer")
const { goods, params } = require("../models/goodsModel")
const err = require("../errors/err")
const { v4 } = require("uuid")

class deviceController {

    async create(req, res, next) {
        try {
            const { name, price, brandID, typeID, info } = req.body
            const file = req.file
            if (!file) {
                return next(err.badRequest("No image"))
            }
            const result = await cloudinary.uploader.upload(file.path, { folder: "avatar" })
            const myDevice = new goods({
                id: v4().toString(),
                name: name,
                brandID: brandID,
                typeID: typeID,
                price: price,
                image: result.url
            })
            if (info) {
                for (let i of info) {
                    myDevice.params.push({
                        title: i.title,
                        description: i.description
                    })

                }
            }
            myDevice.save()

            return res.json(myDevice)
        } catch (e) {
            return next(err.badRequest(e.message))
        }




    }

    async getOne(req, res, next) {
        const { id } = req.query
        const good = await goods.find({ id: id }).exec()
        if (!good) {
            return next(err.badRequest("No such device"))
        }
        return res.json(good)
    }

    async getAll(req, res) {
        const { brandID, typeID } = req.body
        let filter
        if (!brandID && !typeID) {
            filter = await goods.find({}).exec()
        }
        if (brandID && !typeID) {
            filter = await goods.find({ brandID: brandID }).exec()
        }
        if (!brandID && typeID) {
            filter = await goods.find({ typeID: typeID }).exec()
        }
        if (brandID && typeID) {
            filter = await goods.find({ typeID: typeID, brandID: brandID }).exec()
        }
        return res.json(filter)
    }
}

module.exports = new deviceController()