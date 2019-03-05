const mongoose = require('mongoose');


const DishSchema = new mongoose.Schema({
  title: String,
  image: String,
  type: String,
  description: String,
  cost: Number
});

module.exports = mongoose.model('Dish',DishSchema);
