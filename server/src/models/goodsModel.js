const { Schema, model, mongoose } = require("mongoose")

const goodsSchema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    typeID: { type: String, required: true },
    price: { type: Number, required: true, min: 1 },
    discount: { type: Number, min: 0 },
    comments: [{
        name: { type: String },
        text: { type: String },
        time: { type: Date },
        grade: { type: Number }
    }],
    params: [{
        title: { type: String },
        description: { type: String }
    }],
    image: { type: String, required: true },
    state: { type: String, enum: ["В наявності", "Закінчується", "Закінчився", "Очікується"], default: "Очікується" }
})



const typeSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    goods: [{ type: Schema.Types.ObjectId, ref: "good" }]
})

const brandSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    goods: [{ type: Schema.Types.ObjectId, ref: "good" }]
})

const ratingSchema = new Schema({
    id: { type: String, required: true },
    good: { type: Schema.Types.ObjectId, ref: "good" },
    rate: { type: Number, required: true }
});

const articleSchema = new Schema({
    id: { type: String, required: true },
    header: { type: String, required: true },
    text: { type: String, required: true },
    time: { type: Date, default: Date.now }
})

const orderSchema = new Schema({
    id: { type: String, required: true },
    price: { type: Number, required: true },
    basket: [{
        id: { type: String, required: true },
        count: { type: Number, required: true }
    }],
    time: { type: Date, default: Date.now }

})


const goods = mongoose.model('good', goodsSchema)
const type = mongoose.model('type', typeSchema)
const brand = mongoose.model('brand', brandSchema)
const rating = mongoose.model('rating', ratingSchema)
const article = mongoose.model('article', articleSchema)
const order = mongoose.model('order', orderSchema)

module.exports = { goods, type, brand, rating, article, order }
