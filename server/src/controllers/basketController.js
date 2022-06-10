const { v4 } = require("uuid")
const user = require("../models/userModel")
const { goods } = require("../models/goodsModel")
const err = require("../errors/err")



class basketController {

    async add(req, res, next) {
        const { id, good } = req.body

        if (!good) {
            return next(err.badRequest("No device data entered"))
        }
        const result = await user.findOne({ id: id }).exec();

        if (result) {
            for (let i of good) {
                const product = await goods.findOne({ id: i.id }).exec()
                if (!product) {
                    return next(err.badRequest("No device"))
                }
                const index = result.basket.findIndex((good) => good.id == i.id);
                if (index === -1) {
                    result.basket.push({
                        id: product.id,
                        count: i.count
                    })
                } else {
                    result.basket[index].count += i.count;
                }

                result.save()
            }
        }

        res.send('');
    }

    async remove(req, res, next) {
        const { id, goodId } = req.body

        if (!goodId) {
            return next(err.badRequest("No device data entered"))
        }
        const result = await user.findOne({ id: id }).exec();

        if (result) {
            const product = await goods.findOne({ id: goodId }).exec()
            if (!product) {
                return next(err.badRequest("No device"))
            }

            result.basket = result.basket.filter((good) => good.id != product.id);
            result.save()
        }

        res.send('');
    }

    async get(req, res, next) {
        const { id } = req.body
        const result = await user.findOne({ id: id }).exec();
        if (result) {
            res.send(result.basket);
        } else {
            res.send('');
        }
    }

    async removeall(req, res, next) {
        const { id } = req.body

        const result = await user.findOne({ id: id }).exec();

        if (result) {
            result.basket = [];
            result.save()
        }

        res.send('');
    }

}

module.exports = new basketController()