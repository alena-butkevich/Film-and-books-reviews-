var express = require('express');
var http = require('http');
var path = require('path');
var config = require('config');

var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

http.createServer(app).listen(config.get('port'), function(){
  console.log('Express server starts');
});

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',routes );
app.use('/reviews',routes);
app.use('/newreview',routes);
app.use('/result',routes);

app.use(function(req, res, next){
  res.status(404);
  res.send({ error: 'Not found' });
  return;
});

app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.send({ error: err.message });
  return;
});

module.exports = app;