const mongoose = require('mongoose')
const productSchema = new mongoose.Schema(
    {
        name:String,
        price:Number,
        image:String,
        inventory:Number,
        type:String,
        productDescription:String
    },
    {
        timestamps:true
    }
)

const Product = mongoose.model('product', productSchema)

module.exports = Product