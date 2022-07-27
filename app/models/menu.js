const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    image: {type: String, required: true},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    des: {type: String, required: true}
})

const Menu = mongoose.model('Menu', menuSchema)

module.exports = Menu