const mongoose = require('mongoose');
const Dish = require('./dish');

const RestaurantSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  Address: String,
  city: String,
  Dishes:[Dish.schema]
});

module.exports = mongoose.model('Restaurant',RestaurantSchema);
