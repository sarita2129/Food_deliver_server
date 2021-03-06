const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  order_no: String,
  userId: String,
  restaurant_id: String,
  dishId: [String],
  cost: [Number],
  deliverycost: Number,
  deliveryaddress:String
});

module.exports = mongoose.model('Order',OrderSchema);
