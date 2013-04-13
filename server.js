// Module dependencies
var express = require('express')
	, stylus = require('stylus')
	, nib = require('nib');

var test = require('./testdata.json');

var port = parseInt(process.argv[2]) || 8000;

// Configuration
var app = express();

function compile(str, path) {
	return stylus(str)
		.set('filename', path)
		.use(nib());
}

app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));

app.use(stylus.middleware(
	{ src: __dirname + '/public', compile: compile }
));
app.use(express.static(__dirname + '/public'));

// Routes / Listen
app.get('/', function (req, res) {
	res.render('index',
		{ title : 'Home' }
	)
});

app.get('/:id', function (req,res) {
	res.render('single',
		{ title    : test.name,
		  bracket  : test.bracket }
	)
});

app.listen(port);

console.log("Now running on port " + port);
