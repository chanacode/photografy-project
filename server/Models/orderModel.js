const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: Date },
    kind: { type: String },
    numOfChildren: { type: Number },
    userId: {type: String } // קשר בין הזמנה למשתמש

   // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // קשר בין הזמנה למשתמש
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
