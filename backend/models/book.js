const { Schema, model} = require("mongoose")

const BoockSchema = new Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    isbn: {type: String, required: true},
    imagePath: {type: String},
    createAt: {type:Date, default: Date.now()}
})

module.exports= model("Book",BoockSchema)