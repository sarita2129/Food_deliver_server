const mongoose = require('mongoose');

const DishSchema = new mongoose.Schema({
  title: String,
  image: String,
  type: String,
  description: String,
  cost: Number
});

const RestaurantSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  Address: String,
  city: String,
  Dishes:[DishSchema]
});

module.exports = mongoose.model('Restaurant',RestaurantSchema);
