const mongoose = require('mongoose');
var bcrypt = require('bcrypt');

// var mongodb = require('mongodb');
// var db ;
// var db = mongojs(
//   "tasklist",
//   ["tasks"]
// );

// mongodb.Db.connect('mongodb+srv://chatdb:chatdb@cluster0-pvy8y.mongodb.net/tasklist?retryWrites=true', function (err, theDb) {
//     var db = mongojs(theDb, ['tasks'])
// });

let UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    default: ''
  },
  lastname: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
})

UserSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

// let User = mongoose.model('User', UserSchema);

module.exports = mongoose.model('User',UserSchema);
