var express = require('express');
var router = express.Router();

var Film = require('models/film').Film;
var Comment = require('models/comment').Comment;
var itemName = "";
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/films', function(req, res, next) {
    res.render('films');
});

router.get('/books', function(req, res, next) {
  res.render('books');
});

module.exports = router;
