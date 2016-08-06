var express = require('express');
var config = require('./config');
var mongoose = require('mongoose');

var setupController = require('./controllers/setupController');
//var listApiController = require('./controllers/listApiController');
var apiController = require('./controllers/apiController');
//var htmlController = require('./controllers/htmlController');

var app = express();

var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));

// could leave off the route '/' which means the middleware will do something for every load
app.use('/', function(res, req, next) {
    console.log('index reached');
    next(); // move to the next middleware for the route
});

// view engine setup
app.set('view engine', 'ejs');

// call the function defined under config.getDbConnectionString to return the string value
mongoose.connect(config.getDbConnectionString());

// adds api endpoint to our express app
// setupController is a function that takes in the app to get the data
setupController(app);

// for the api routing
//listApiController(app);
apiController(app);

// for sending to angular for routing initially
// because I'm setting this up as a single page app, the remainder of the
// http request will be handled with AJAX requests
// htmlController(app);

app.get('/', function(request, response) {
	
	response.render('index');
	
});

app.listen(port);