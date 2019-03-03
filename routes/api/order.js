var express = require('express');
var router = express.Router();
// var mongojs = require('mongojs');
const mongoose = require('mongoose');
// var User = require('../../models/users.js');
var Order = require('../../models/order.js');
// var DishSchema = require('../../models/restaurant.js');
var Restaurant = require('../../models/restaurant.js');

mongoose.connect('mongodb+srv://chatdb:chatdb@cluster0-pvy8y.mongodb.net/tasklist?retryWrites=true', {useNewUrlParser: true}).then(() => {
  console.log('db connected');
});

router.get('/orders', (req, res, next) => {
  Order.find({}, function(err, orders) {
    var orderMap = {};

    orders.forEach(function(order) {
      orderMap[order._id] = order;
    });

    res.send(orderMap);
  });
});
router.post('/order', (req, res, next) => {
  // let dishes = new DishSchema();
  const { body } = req;
    const{
      order_no,
      userId,
      dishId,
      cost,
      deliverycost,
      deliveryaddress
    } = body;
    // {[DishSchema]} = body.toArray();
  // res.send(firstname);

  if(!order_no){
      return res.send({
        success: false,
        message: 'Error: Server Error: Order No blank'
      })
    }
    if(!userId){
      return res.send({
        success: false,
        message: 'Error: Server Error:UserId Blank.'
      })
    }
    if(!dishId){
      return res.send({
        success: false,
        message: 'Error: Server Error: Dish info blank.'
      })
    }
      let newOrder = new Order();
      newOrder.order_no = order_no;
      newOrder.userId = userId;
      newOrder.dishId = dishId;
      newOrder.cost = cost;
      newOrder.deliverycost = deliverycost;
      newOrder.deliveryaddress = deliveryaddress;

      newOrder.save((err , user) => {
        if(err){
          return res.send({
            success: false,
            message: err
          });
        }
          return res.send({
            success: true,
            message: 'Data saved successfully'
          });
      });

    //});
});

router.get('/orderdetails', (req, res, next) => {
  const { query } = req;
  const { id } = query;
  // var dishid = Order.find({_id: id})[0].dishId
  // Order.find({ _id: id}, function(err, order) {
    // var restaurantMap = {};

    // restaurants.forEach(function(restaurant) {
    //   restaurantMap[restaurant._id] = restaurant;
    // });
    // console.log(dishid)
    // let order1 = order;
    // res.send(order);
    Restaurant.Dishes.find({ _id: "5c79fafc07d0e4c89b0a93eb"}, function(err, restaurant) {
      res.send(restaurant);
    });


  // });
});
module.exports = router;
