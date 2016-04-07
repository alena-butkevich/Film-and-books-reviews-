var express = require('express');
var router = express.Router();
var ejs = require('ejs');
var mongoose = require('mongoose');
var Film = require('../models/film').Film;
var Book = require('../models/book').Book;
var Comment = require('../models/comment').Comment;
var arrFilms = [];
var arrBooks = [];
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/films', function(req, res, next) {
   /* var r = [];
    var film = new Film({
        name: "Cinderella",
        annotation:"When her father unexpectedly passes away, young Ella finds herself at the mercy of her cruel " +
        "stepmother and her scheming step-sisters. Never one to give up hope, Ella's fortunes begin to change after " +
        "meeting a dashing stranger.",
        year:2015,
        image:"https://resizing.flixster.com/XYVHI9W_KrAKfVXUWC2uF7yzIlc=/180x267/v1.bTsxMTE4MTU3MDtqOzE3MDE5OzIwNDg7NDA1OzYwMA",
        rating: r
    });
    film.save(function(err, film) {
        if (err) return console.error(err);
    });
    res.send("It's OK");*/
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
            var r = [ ];
            film.name = item.name;
            film.id = item._id;
            film.annotation = item.annotation;
            film.year = item.year;
            film.rating = item.rating;
            film.image = item.image;
            var rating = 0 
                for(var i=0; i<film.rating.length; i++) {
                rating += film.rating[i]; }
            rating/=film.rating.length;
            /*film.comments = item.comments;*/
        res.render("filmReviews", {film: film, rating: rating});
    });

});

router.get('/addfilmreview', function (req, res, next){
     res.render("newreview");
});

router.post('/result', function (req, res, next) {
    creatorid = '570418dcdb0348c40be9b725';
    scope = req.body.scope;
    var comment = new Comment({
        text: req.body.text,
        scope: req.body.scope,
        date:new Date(),
        _creator: creatorid
    });
    Film.findById( creatorid, function (err, item, comment) {
        film = new Film();
        film = item;
        film.rating.push(scope);
        film.save(function(err, film) {
            if (err) return console.error(err);
        });
    });
    comment.save(function(err, comment) {
        if (err) return console.error(err);
    });
    res.send("Review is adding!");
});

module.exports = router;
