var express = require('express');
var router = express.Router();
// var mongojs = require('mongojs');
const mongoose = require('mongoose');
var User = require('../../models/users.js');
var UserSession = require('../../models/usersession.js');

mongoose.connect('mongodb+srv://chatdb:chatdb@cluster0-pvy8y.mongodb.net/FoodDelivery?retryWrites=true', {useNewUrlParser: true}).then(() => {
  console.log('db connected');
});

router.get('/users', (req, res, next) => {
  User.find({}, function(err, users) {
    var userMap = {};

    users.forEach(function(user) {
      userMap[user._id] = user;
    });

    res.send(userMap);
  });
});
router.post('/user', (req, res, next) => {
  const { body } = req;
    const{
      firstname,
      lastname,
      password
    } = body;
    let {
      email
    } = body;
  // res.send(firstname);

  if(!firstname){
      return res.send({
        success: false,
        message: 'Error: firstname cannot be blank.'
      })
    }
    if(!lastname){
      return res.send({
        success: false,
        message: 'Error: lastname cannot be blank.'
      })
    }

    if(!email){
      return res.send({
        success: false,
        message: 'Error: email cannot be blank.'
      })
    }
    if(!password){
      return res.send({
        success: false,
        message: 'Error: password cannot be blank.'
      })
    }

    email: email.toLowerCase();

    User.find({
      email: email
    }, (err, previousUsers) => {
      if(err){
        return res.send({
          success: false,
          message: 'Server Error'
        })
      }
      else if(previousUsers.length > 0){
        return res.send({
          success: false,
          message: 'Account already exists'
        })
      }

      let newUser = new User();
      newUser.firstname = firstname;
      newUser.lastname = lastname;
      newUser.email = email;
      newUser.password = newUser.generateHash(password);
      newUser.save((err , user) => {
        if(err){
          return res.send({
            success: false,
            message: 'Server Error'
          });
        }

          return res.send({
            success: true,
            message: 'Signed up!'
          });

      });

    });
});
router.post('/login', (req, res, next) => {
  // console.log(req);
  const { body } = req;
    const{
      password
    } = body;
    let {
      email
    } = body;

    if(!email){
      return res.send({
        success: false,
        message: 'Error: email cannot be blank.'
      })
    }
    if(!password){
      return res.send({
        success: false,
        message: 'Error: password cannot be blank.'
      })
    }

    email: email.toLowerCase();

    User.find({email: email}, (err, users) => {
      if(err){
        return res.send({
          success: false,
          message: 'Error: server error.'
        });
      }
      if(users.length != 1){
        return res.send({
          success: false,
          message: 'Error: Invalid.'
        });
      }

      const user = users[0];
      // const userData = JSON.stringify({
      //   username: `${user.firstname} ${user.lastname}`,
      //   email: user.email
      // });
      if(!user.validPassword(password)){
        return res.send({
          success: false,
          message: 'Error: Invalid password.'
        });
      }
      const usersession = new UserSession();
      usersession.userId = user._id;
      usersession.save((err,doc) => {
        if(err){
          return res.send({
            success: false,
            message: 'Error: Invalid password.'
          });
        }
        return res.send({
          success: true,
          message: 'Error: Valid Signin.',
          token: doc._id,
          username:`${user.firstname} ${user.lastname}`,
          email: user.email,
          userid: user._id
          // user:JSON.stringify({
          //   username: `${user.firstname} ${user.lastname}`,
          //   email: user.email,
          //   userid: user._id
          // })
        });
      })

    })

});
router.get('/verify', (req, res, next) => {
  const { query } = req;
  const { token } = query;

  UserSession.find({
    _id:token,
    isDeleted:false
  }, (err,session) => {
      if(err){
        return res.send({
          success: false,
          message: 'Error: Server Error.'
        });
      }
      if(session.length != 1){
        return res.send({
          success: false,
          message: 'Error: Invalid.'
        });
      }
      else{
        return res.send({
          success: true,
          message: 'Good.'
        });
      }
  });
});
router.get('/logout', (req, res, next) => {
  const { query } = req;
  const { token } = query;

  UserSession.findOneAndUpdate({
    _id:token,
    isDeleted:false
  },{
    $set:{isDeleted:true}
  }, null, (err,session) => {
      if(err){
        return res.send({
          success: false,
          message: 'Error: Server Error.'
        });
      }
        return res.send({
          success: true,
          message: 'Good.'
        });

  });
});
module.exports = router;
