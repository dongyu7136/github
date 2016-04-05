var http = require('http'),
	express = require('express'),
	fs = require('fs'),
	path = require('path'),
	routes = require('./routes'),
	errorHandler = require('errorhandler');
var app = express();


app.set('port', process.env.PORT || 8081);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));


if ('development' == app.get('env')) {
	app.use(errorHandler());
}


//routes
routes(app);

var server = http.createServer(app).listen(app.get('port'));

console.log('serve is listening in '+ app.get('port'));

