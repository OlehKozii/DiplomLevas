const { v4 } = require("uuid")
const user = require("../models/userModel")
const { article, order } = require("../models/goodsModel")
const err = require("../errors/err")
const { createHash, compareHash } = require("../service/bcrypt")
const generateToken = require("../service/jwt")

class userController {
    async registration(req, res, next) {
        try {
            if (!req.body.email || !req.body.password || !req.body.name) {
                return next(err.badRequest("No password or email entered"))
            }
            const candidate = await user.findOne({ "email": req.body.email }).exec()

            if (candidate) {
                return next(err.badRequest('User with this email already exist'))
            }
            let _password = await createHash(req.body.password)
            const myuser = new user({
                id: v4().toString(),
                name: req.body.name,
                email: req.body.email,
                password: _password,
            })
            await myuser.save()
            const token = generateToken(myuser.id, myuser.email, myuser.name, myuser.role)
            return res.json({ token })
        } catch (error) {
            return res.send(error)
        }

    }

    async login(req, res, next) {
        try {
            if (!req.body.email || !req.body.password) {
                return next(err.badRequest("No password or email entered"))
            }
            const candidate = await user.findOne({ "email": req.body.email }).exec()
            if (!candidate) {
                return next(err.internal('User with this email donesn\'t exist'))
            }
            let passwordCheck = await compareHash(req.body.password, candidate.password)
            if (!passwordCheck) {
                return next(err.internal('Wrong password'))
            }
            const token = generateToken(candidate.id, candidate.email, candidate.name, candidate.role)
            return res.json({ token })
        } catch (error) {
            return res.send(error)
        }
    }

    async getAllUsers(req, res, next) {
        try {
            const users = await user.find({}).exec();
            res.send(users);
        } catch (e) {
            console.log(e);
            return next(err.badRequest("Cannot create article"));
        }
    }

    async createArticle(req, res, next) {
        try {
            const { header, text } = req.body;
            const newArticle = new article({ id: v4().toString(), header, text });
            if (!candidate) return next(err.badRequest("Cannot create article"));
            await newArticle.save();
            res.send(newArticle);
        } catch (e) {
            console.log(e);
            return next(err.badRequest("Cannot create article"));
        }
    }

    async deleteArticle(req, res, next) {
        try {
            const id = req.params.id;
            const candidate = await article.deleteOne({ id });
            if (!candidate) return next(err.badRequest("Cannot delete article"));
            res.send(candidate);
        } catch (e) {
            console.log(e);
            return next(err.badRequest("Cannot delete article"));
        }
    }

    async getArticle(req, res, next) {
        try {
            const id = req.params.id;
            const candidate = await article.findOne({ id });
            if (!candidate) return next(err.badRequest("Cannot get article"));
            res.send(candidate);
        } catch (e) {
            console.log(e);
            return next(err.badRequest('Cannot get article'));
        }
    }

    async getArticles(req, res, next) {
        try {
            const articles = await article.find({}).exec();
            res.send(articles);
        } catch (e) {
            console.log(e);
            return next(err.badRequest("Cannot get articles"));
        }
    }

    async editArticle(req, res, next) {
        try {
            const { text, header } = req.body
            const id = req.params.id
            const candidate = await article.updateOne({ id }, { header: header, text: text, time: Date.now() });
            if (!candidate) {
                return next(err.badRequest('Something went wrong'))
            }
            res.send("Successfully edited article")
        } catch (e) {
            console.log(e);
            return next(err.badRequest("Cannot edit article"));
        }
    }
    async createOrder(req, res) {
        try {
            const { userID, price } = req.body;
            const candidate = await user.findOne({ id: userID }).exec()
            const myorder = new order({
                id: v4().toString(),
                price: price,
            })
            for (let i of candidate.basket) {
                myorder.basket.push({
                    id: i.id,
                    count: i.count
                })
                myorder.save()
            }
            console.log(myorder.basket);
            candidate.basket = []
            await candidate.save()
            res.send();

        } catch (e) {
            console.log(e);
        }
    }
    async getAllOrders(req, res) {
        try {
            const orders = await order.find({}).exec()
            res.send(orders)
        } catch (e) {
            console.log(e);
        }
    }

}

module.exports = new userController()