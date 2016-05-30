var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var pets = require('./routes/pets');
var index = require('./routes/index');


// Middlware
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Express Routes
app.use('/pets', pets);
app.use('/', index);


// Database connection
var databaseURI = 'mongodb://localhost:27017/mu';

mongoose.connect(databaseURI);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connection open ', databaseURI);
});

mongoose.connection.on('error', function (err) {
  console.log('Mongoose error connecting ', err);
});

// Set Port and Start Server
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
  console.log('listening on port: ', app.get('port'));
});
