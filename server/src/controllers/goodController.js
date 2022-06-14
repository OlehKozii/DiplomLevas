const cloudinary = require("../service/cloudinaryConfig")
const { upload } = require("../service/multer")
const { goods, params, type } = require("../models/goodsModel")
const err = require("../errors/err")
const { v4 } = require("uuid")
const { badRequest } = require("../errors/err")

class deviceController {

    async create(req, res, next) {
        try {
            const { name, price, typeID } = req.body;
            const file = req.file
            console.log(req.body.state)
            if (!file) {
                return next(err.badRequest("No image"))
            }
            if (req.body.state === "") {
                req.body.state = "В наявності"
            }
            const result = await cloudinary.uploader.upload(file.path, { folder: "avatar" })
            const myDevice = new goods({
                id: v4().toString(),
                name: name,
                state: req.body.state,
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

    async addType(req, res) {
        const { typeName } = req.body;
        
        const newType = await type.create({
            id:  v4().toString(),
            name: typeName,
            good: []
        });
        await newType.save();
        res.send(newType);

    }

    async deleteProduct(req, res) {
        const id = req.params.id;
        const good = await goods.deleteOne({ id: id }).exec();
        res.send("");
    }

    async getOne(req, res, next) {
        const id = req.params.id
        const good = await goods.findOne({ id: id }).exec()
        if (!good) {
            return next(err.badRequest("No such device"))
        }
        let grade = null;
        if (good.comments) {
            grade = good.comments.reduce((r, c) => r + c.grade, 0) / good.comments.length;
        }
        return res.send({...good._doc, grade})
    }

    async addComment(req, res, next) {
        const id = req.params.id;
        const { name, text, time, grade } = req.body;
        const good = await goods.findOne({ id: id }).exec()
        if (!good) {
            return next(err.badRequest("No such device"))
        }
        good.comments.unshift({ name, text, time, grade })
        good.save()
        return res.send(good)
    }

    async getAll(req, res) {
        const { state, typeID, discount } = req.query
        let filter
        try {
            if (!typeID && !state && !discount) {
                filter = await goods.find({}).exec()
            }
            if (typeID && state && discount) {
                filter = await goods.find({ state: state,  /*,discount*/ })
                    .where('typeID').in(typeID)
                    .exec()
            }
            if (state && !typeID && !discount) {
                filter = await goods.find({ state: state }).exec()
            }
            if (state && !typeID && discount) {
                filter = await goods.find({ state: state/*,discount*/ }).exec()
            }
            if (typeID && !state && discount) {
                filter = await goods.find({ typeID: { $in: typeID }/*,discount*/ }).exec()
            }
            if (typeID && !state && !discount) {
                filter = await goods.find({ typeID: { $in: typeID } }).exec()
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

    async edit(req, res, next) {
        const {name, price, typeID, state, info} = req.body;
        const goodId = req.params.id;

        if (!goodId) {
            return next(err.badRequest("No device data entered"))
        }

        const product = await goods.findOne({ id: goodId }).exec()
        if (!product) {
            return next(err.badRequest("No device"))
        }

        // product = {...product, name, price, typeID, state};
        product.name = name;
        product.price = price;
        product.typeID = typeID;
        product.state = state;
        product.save()

        res.send('');
    }

}

module.exports = new deviceController()