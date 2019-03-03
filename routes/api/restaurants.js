var express = require('express');
var router = express.Router();
// var mongojs = require('mongojs');
const mongoose = require('mongoose');
// var User = require('../../models/users.js');
var Restaurant = require('../../models/restaurant.js');
// var DishSchema = require('../../models/restaurant.js');

mongoose.connect('mongodb+srv://chatdb:chatdb@cluster0-pvy8y.mongodb.net/tasklist?retryWrites=true', {useNewUrlParser: true}).then(() => {
  console.log('db connected');
});

router.get('/restaurants', (req, res, next) => {
  Restaurant.find({}, function(err, restaurants) {
    var restaurantMap = {};

    restaurants.forEach(function(restaurant) {
      restaurantMap[restaurant._id] = restaurant;
    });

    res.send(restaurantMap);
  });
});

router.post('/restaurant', (req, res, next) => {
  // let dishes = new DishSchema();
  const { body } = req;
    const{
      name,
      image,
      description,
      address,
      city,
      dishes
    } = body;
    // {[DishSchema]} = body.toArray();
  // res.send(firstname);

  if(!name){
      return res.send({
        success: false,
        message: 'Error: name cannot be blank.'
      })
    }
    if(!dishes){
      return res.send({
        success: false,
        message: 'Error: Dishes cannot be blank.'
      })
    }
      let newRestaurant = new Restaurant();
      newRestaurant.name = name;
      newRestaurant.image = image;
      newRestaurant.description = description;
      newRestaurant.Address = address;
      newRestaurant.city = city;
      newRestaurant.Dishes = dishes;

      newRestaurant.save((err , user) => {
        if(err){
          return res.send({
            success: false,
            message: 'Server Error'
          });
        }
          return res.send({
            success: true,
            message: 'Data saved successfully'
          });
      });

    //});
});
router.get('/restaurant', (req, res, next) => {
  const { query } = req;
  const { id } = query;

  Restaurant.find({ _id: id}, function(err, restaurant) {
    // var restaurantMap = {};

    // restaurants.forEach(function(restaurant) {
    //   restaurantMap[restaurant._id] = restaurant;
    // });

    res.send(restaurant);
  });
});
module.exports = router;
