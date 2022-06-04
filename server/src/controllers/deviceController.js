const cloudinary = require("../service/cloudinary")
const {de} = require("../models/goodsModel")
const err = require("../errors/err")

class deviceController{

    async create(req, res){
    //     id:{type:String, required:true,unique:true},
    // name:{type:String, required:true},
    // latinName:{type:String, required:true},
    // brand:{type:Schema.Types.ObjectId,ref:"brand",required:true},
    // type:{type:Schema.Types.ObjectId,ref:"type",required:true},
    // price:{type:Number, required:true, min:1},
    // discount:{type:Number, min:0},
    // params:[{type:Schema.Types.ObjectId,ref:"param"}],
    // images:[{type:String,required:true}]
        const {name,price,brandID,TypeID,discount,info} =req.body
        const {img}=req.files
        if(!img){
            return next()
        }

        if(info){

        }



    }

    async getOne(req,res){

    }

    async getAll(req, res){
        
    }
}

module.exports = new deviceController()