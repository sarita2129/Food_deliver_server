var express = require('express');
var router = express.Router();
// var mongojs = require('mongojs');
const mongoose = require('mongoose');
// var User = require('../../models/users.js');
var Order = require('../../models/order.js');
// var DishSchema = require('../../models/restaurant.js');
var Dish = require('../../models/dish.js');
var Restaurant = require('../../models/restaurant.js');

mongoose.connect('mongodb+srv://chatdb:chatdb@cluster0-pvy8y.mongodb.net/FoodDelivery?retryWrites=true', {useNewUrlParser: true}).then(() => {
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
      restaurant_id,
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
      newOrder.restaurant_id = restaurant_id;
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

  // var order = Order.find({_id: id});
  // Order.aggregate([
  // {$lookup: {from: 'Dish', localField: '_id',foreignField: 'dishId',as: 'Order'}},
  // {$match: { $and:[{ "Dish._id": { "$exists": true } },{"Order._id": id}]} }
  // ]).exec(function (err, result) {
  //       if (err) return res.send('400', {message: 'Unable to fetch employees data by status. Please try again later'});
  //
  //       return res.jsonp(result);
  //     });
  Order.find({ _id: id}, function(err, order) {
    // var order
    // res.send(order.dishId.length;
    // for(let i=0; i<=order.dishId.count-1;i++){
    // console.log(order.dishId[i]);
    // }
    var orderMap = {};

    // console.log(order[0].dishId);
      Restaurant.find({ _id: order[0].restaurant_id}, function(err, restaurant) {
        // orderMap[restaurant._id] = restaurant;
        // console.log(restaurant[0].Dishes);
        var filtered = restaurant[0].Dishes.filter(function(r) {
            // return !outputdata.some(function(t) {
            //     return r.User === t.User && r.SOP === t.SOP;
            // });
          return order[0].dishId.some(function(t){
            // console.log(r._id === t);
            // console.log("tid" + t);

            return String(r._id) === String(t);
          });
        });
        // console.log(filtered);
        var orderdetails = {
          order: order,
          dishes: filtered,
          name: restaurant[0].name,
          description:restaurant[0].description,
          Address:restaurant[0].Address
        };
        console.log(orderdetails);
        res.send(orderdetails);
      });
      // order[0].dishId.map((dish) => {
      //   console.log(dish);
      //   // Dish.find({ _id: dish}, function(err, dish) {
      //   //   orderMap[dish._id] = dish;
      //   // });
      //   });
      // res.send(orderMap);

      });
    // });

    // var restaurantMap = {};
    // restaurants.forEach(function(restaurant) {
    //   restaurantMap[restaurant._id] = restaurant;
    // });
    // console.log(order.dishId.length);
    // let order1 = order;
    // res.send(order);
    // Restaurant.Dishes.find({ _id: dishid}, function(err, restaurant) {
    //   res.send(restaurant);
    // });

  // });
});
router.get('/myorders', (req, res, next) => {
  const { query } = req;
  const { id } = query;
  // var orders={};
  // var orderdetails = {};
  Order.find({userId: id}, function(err, orders) {
    var orderMap = {};

    // orders.forEach(function(order) {
    //
    //   // orders[order._id] = order;
    //
    //   // console.log(order.restaurant_id);
    //     Restaurant.find({ _id: order.restaurant_id}, function(err, restaurant) {
    //       // orderMap[restaurant._id] = restaurant;
    //       // console.log(restaurant[0].Dishes);
    //           var filtered = restaurant[0].Dishes.filter(function(r) {
    //           // return !outputdata.some(function(t) {
    //           //     return r.User === t.User && r.SOP === t.SOP;
    //           // });
    //           return order.dishId.some(function(t){
    //           // console.log(r._id === t);
    //           // console.log("tid" + t);
    //
    //           return String(r._id) === String(t);
    //         });
    //       });
    //       // console.log(filtered);
    //       var orderdetails = {
    //         order: order,
    //         dishes: filtered,
    //         name: restaurant[0].name,
    //         description:restaurant[0].description,
    //         Address:restaurant[0].Address
    //       };
    //       // orderMap.push(orderdetails);
    //
    //     });
    //     console.log(orderdetails);
    //
    //     orderMap[order._id] = orderdetails;
    //
    // });
    // console.log(orderMap);
    orders.forEach(function(order) {
      orderMap[order._id] = order._id;
    });
    // console.log(orders);
    res.send(orderMap);

  });

});
module.exports = router;
