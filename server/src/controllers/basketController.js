const { v4 } = require("uuid")
const user = require("../models/userModel")
const { goods } = require("../models/goodsModel")
const err = require("../errors/err")

class basketController {

    async add(req, res, next) {
        const { goodId } = req.body;
        const { user } = req

        if (!goodId) {
            return next(err.badRequest("No device data entered"))
        }
        
        const product = await goods.findOne({ id: goodId }).exec()
        if (!product) {
            return next(err.badRequest("No device"))
        }

        const index = user.basket.findIndex((i) => i.id == goodId);
        if (index === -1) {
            user.basket.push({
                id: product.id,
                count: 1
            })
        } else {
            user.basket[index].count++;
        }

        await user.save();

        // const result = await user.findOne({ id: id }).exec();

        // if (result) {
        //     for (let i of good) {
        //         const product = await goods.findOne({ id: i.id }).exec()
        //         if (!product) {
        //             return next(err.badRequest("No device"))
        //         }
        //         const index = result.basket.findIndex((good) => good.id == i.id);
        //         if (index === -1) {
        //             result.basket.push({
        //                 id: product.id,
        //                 count: i.count
        //             })
        //         } else {
        //             result.basket[index].count += i.count;
        //         }

        //         result.save()
        //     }
        // }

        res.send('');
    }

    async addMany(req, res, next) {
        const { goodId, count } = req.body;
        const { user } = req

        if (!goodId) {
            return next(err.badRequest("No device data entered"))
        }
        
        const product = await goods.findOne({ id: goodId }).exec()
        if (!product) {
            return next(err.badRequest("No device"))
        }

        const index = user.basket.findIndex((i) => i.id == goodId);
        if (index === -1) {
            user.basket.push({
                id: product.id,
                count: Number(count)
            })
        } else {
            user.basket[index].count += Number(count);
        }

        await user.save();

        res.send('');
    }

    async remove(req, res, next) {
        const goodId = req.params.id;
        const { id } = req.user;

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

    async get(req, res) {

        const { user } = req;

        const basket = await Promise.all(user.basket.map(async (item) => {
            const product = await goods.findOne({ id: item.id }).exec();
            if (product) return {...product._doc, count: item.count};
        }));

        Promise.all(basket);
        res.send(basket.filter(item => item));
    }

    async removeall(req, res, next) {
        const { id } = req.user

        const result = await user.findOne({ id: id }).exec();

        if (result) {
            result.basket = [];
            result.save()
        }

        res.send('');
    }

}

module.exports = new basketController()