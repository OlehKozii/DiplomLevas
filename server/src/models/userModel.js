const { Schema, model, default: mongoose } = require("mongoose")

const userSchema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "customer"], default: "customer" },
    basket: [{
        id: { type: String, required: true },
        count: { type: Number, required: true }
    }],
    orders: [{ type: String }],
    ratings: [{ type: Schema.Types.ObjectId, ref: "rating" }]
    // ,
    // isActivated,
    // activationLink
})



module.exports = mongoose.model("user", userSchema)
