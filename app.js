var express = require('express');
var http = require('http');
var path = require('path');
var config = require('config');
var Film = require('models/film').Film;
var filmName = "";

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
  filmName = req.body.FilmName;
  console.log(filmName);
  Film.find({
    name: filmName}, function(err, zootopia){
    res.send(zootopia);
  });
});

app.get('/newreview', function(req, res, next) {
  res.render('newreview', { body: 'Hello' });
});

app.post('/result', function (req, res, next) {
  console.log(req.body.text);
  var film = new Film({
    name: filmName,
    kind: "film",
    text: req.body.text
  });
  film.save(function(err, thor) {
    if (err) return console.error(err);
  });
  Film.find({
    name: filmName}, function(err, zootopia){
    console.log(zootopia);
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


