const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    porducctId: Number,
    quantity: Number,
    price: Number,
});

const orderSchema = new mongoose.Schema({
    orderId: String,
    value: Number,
    creationDate: Date,
    items: [itemSchema],
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;