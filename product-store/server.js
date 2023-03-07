const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const Product = require('./model/index')



app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

const database = "products"
const connectionString = `mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@mycluster.xasbj2m.mongodb.net/${database}?retryWrites=true&w=majority`
mongoose.set('strictQuery', false);
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
mongoose.connection.once('open', () => {
    console.log('mongo connected');
})






app.get('/get_products', async (req, res) => {
    let response = await Product.find({})
    res.send(response)
})

app.post('/create_product', async (req, res) => {
    console.log(req.body);
    let response = await Product.create(req.body)
    res.send('connected')
    console.log('worki');
})

app.delete('/delete_product/', async (req, res) => {
    let productId = { _id: req.query.products_id }
    let response = await Product.deleteOne(productId)
    res.send(response.status)

})

app.put('/update_product', async (req, res) => {
    console.log(req.body, req.query);
    let response = await Product.findOneAndUpdate({ _id: req.query.product_id }, req.body, { new: true })
    res.send(response)
})


app.get('/get_specific_product/:product_id', async (req, res) => {
    let productId = req.params.product_id
    console.log(productId);
    let dataResponse = await Product.findById(productId)
    console.log(dataResponse);
    res.json(dataResponse)
})





app.listen(5000, () => {
    console.log(`Server is Listening on 5000`)
})