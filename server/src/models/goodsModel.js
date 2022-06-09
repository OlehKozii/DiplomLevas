const {Schema, model,mongoose} = require("mongoose")

const goodsSchema= new Schema({
    id:{type:String, required:true,unique:true},
    name:{type:String, required:true},
    brandID:{type:String,required:true},
    typeID:{type:String,required:true},
    price:{type:Number, required:true, min:1},
    discount:{type:Number, min:0},
    params:[{type:Schema.Types.ObjectId,ref:"param"}],
    image:{type:String,required:true}
})

const paramsSchema = new Schema({
    title:{type:String, required:true},
    description:{type:String, required:true}
})

const typeSchema = new Schema({
    id:{type:String, required:true},
    name:{type:String, required:true},
    goods:[{type:Schema.Types.ObjectId,ref:"good"}]
})

const brandSchema = new Schema({
    id:{type:String, required:true},
    name:{type:String, required:true},
    goods:[{type:Schema.Types.ObjectId,ref:"good"}]
})

const ratingSchema = new Schema({
    id:{type:String, required:true},
    good:{type:Schema.Types.ObjectId,ref:"good"},
    rate:{type:Number, required:true}
});

const goods=mongoose.model('good', goodsSchema)
const param=mongoose.model('param', paramsSchema)
const type=mongoose.model('type', typeSchema)
const brand=mongoose.model('brand', brandSchema)
const rating=mongoose.model('rating', ratingSchema)

module.exports = {goods, param, type, brand, rating}
