var express = require('express');
var http = require('http');
var path = require('path');
var config = require('config');
var Item = require('models/item').Item;
var itemName = "";

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

app.get('/', function(req, res, next) {
  res.render('index', { body: 'Hello' });
});

app.post('/reviews', function(req, res, next){
  itemName = req.body.ItemName;
  console.log(itemName);
  Item.find({
    name: itemName}, function(err, items){
    res.send(items);
  });
});

app.get('/newreview', function(req, res, next) {
  res.render('newreview', { body: 'Hello' });
});

app.post('/result', function (req, res, next) {
  console.log(req.body.text);
  var item = new Item({
    name: itemName,
    kind: "film",
    text: req.body.text
  });
  item.save(function(err, thor) {
    if (err) return console.error(err);
  });
    
  res.send("Review is adding!");
});

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


