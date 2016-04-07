var express = require('express');
var router = express.Router();
var ejs = require('ejs');
var mongoose = require('mongoose');
var Film = require('../models/film').Film;
var Book = require('../models/book').Book;
var arrFilms = [];
var arrBooks = [];
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/films', function(req, res, next) {
    var str = " ";

    Film.find({
    }, {}, function (err, films) {
        films.forEach(function(item, films){
            var r = [ ];
            var film = {};
            film.name = item.name;
            film.id = item._id;
            film.annotation = item.annotation;
            film.year = item.year;
            film.rating = item.rating;
            film.image = item.image;
            arrFilms.push(film);
        });
        res.render("films", {Films: arrFilms});
        delete arrFilms;
    });
});

router.get('/books', function(req, res, next) {
    var str = " ";

    Book.find({
    }, {}, function (err, books) {
        books.forEach(function(item, films){
            var r = [ ];
            var book = {};
            book.name = item.name;
            book.id = item._id;
            book.annotation = item.annotation;
            book.author = item.author;
            book.rating = item.rating;
            book.image = item.image;
            arrBooks.push(book);
        });
        res.render("books", {Books: arrBooks});
        delete arrBooks;
    });
});

router.get('/filmReviews', function(req, res, next){
    var id = '570418dcdb0348c40be9b725';
    var film = {};
    var comment = {};
    Film.findById( id)
        .populate('comments')
        .exec( function (err, item) {
            film.name = item.name;
            film.id = item._id;
            film.annotation = item.annotation;
            film.year = item.year;
            film.rating = item.rating;
            film.image = item.image;
            var rating = 0;
                for(var i=0; i<film.rating.length; i++) {
                rating += film.rating[i]; }
            rating/=film.rating.length;
            film.comments = item.comments;
        res.render("filmReviews", {film: film, rating: rating});
    });
});

router.get('/addfilmreview', function (req, res, next){
     res.render("newreview");
});

router.post('/result', function (req, res, next) {
    creatorid = '570418dcdb0348c40be9b725';
    scope = req.body.scope;
    Film.findById(creatorid, function (err, item, comment) {
        film = new Film();
        film = item;
        film.rating.push(scope);
        film.comments.push({text: req.body.text, score: req.body.scope, date: new Date()});
        film.save(function (err, film) {
            if (err) return console.error(err);
        });
        res.send("Review is adding!");
    });
});
module.exports = router;
