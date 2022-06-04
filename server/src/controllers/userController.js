const {v4} =require("uuid")
const user = require("../models/userModel")
const err = require("../errors/err")
const {createHash, compareHash}= require("../service/bcrypt")
const generateToken = require("../service/jwt")


class userController{
    async registration(req,res,next){
        try {
            if(!req.body.email || !req.body.password){
                return next(err.badRequest("No password or email entered"))
            }
            const candidate = await user.findOne({"email":req.body.email}).exec()
    
            if(candidate){
                return next(err.badRequest('User with this email already exist'))
            }
            let _password= await createHash(req.body.password)
            const myuser= new user({
                id:v4().toString(),
                email:req.body.email,
                password:_password,
                role:req.body.role
            })
            myuser.save()
            const token = generateToken(myuser.id, myuser.email, myuser.role)
            return res.json({token})
        } catch (error) {
            return res.send(error)
        }
            
    }

    async login(req, res, next){
        try {
            if(!req.body.email || !req.body.password){
                return next(err.badRequest("No password or email entered"))
            }
            const candidate = await user.findOne({"email":req.body.email}).exec()
            if(!candidate){
                return next(err.internal('User with this email donesn\'t exist'))
            }
            let passwordCheck = await compareHash(req.body.password, candidate.password)
            if(!passwordCheck){
                return next(err.internal('Wrong password'))
            }
            const token = generateToken(candidate.id, candidate.email, candidate.role)
            return res.json({token})
        } catch (error) {
            return res.send(error)
        }
    }

    

    async check(req, res, next){
        // const token = generateToken(req.user.id, req.user.email, req.user.role)
        const token = generateToken(req.body.id, req.body.email, req.body.role)
        return res.json({token})
    }
}

module.exports = new userController()