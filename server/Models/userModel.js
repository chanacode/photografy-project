const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String},
    email: { type: String },
    password: { type: String, },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] // קשר להזמנות
});

const User = mongoose.model('User', userSchema);
module.exports = User;
