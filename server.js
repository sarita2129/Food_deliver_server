var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var users = require('./routes/api/signin');
var restaurants = require('./routes/api/restaurants');
var orders = require('./routes/api/order');

const cors = require('cors');
var PORT = process.env.PORT || 5000;

var app = express();


// app.use(cors({
//   origin:"http://localhost:3000",
//   credentials: true
// }));
//commented
// app.use(function (req, res, next) {
//
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//
//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//
//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//
//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);
//
//     // Pass to next layer of middleware
//     next();
// });
//commented

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.engine("html", require("ejs").renderFile);
app.use(express.static(path.join(__dirname, "client")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/api', users);
app.use('/api', restaurants);
app.use('/api', orders);
app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname + '/index.html'))
});

// app.use('/api/login', require('./routes/api/signin'));
app.listen(PORT);
