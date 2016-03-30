var express = require('express');
var router = express.Router();

var Item = require('models/item').Item;
var itemName = "";
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/reviews', function(req, res, next){
  itemName = req.body.ItemName;
  Item.find({
    name: itemName}, {text: 1, _id: 0}, function(err, items){
    res.send(items);
  });
});

router.get('/newreview', function(req, res, next) {
  res.render('newreview');
});

router.post('/result', function (req, res, next) {
  console.log(req.body.text);
  var item = new Item({
    name: itemName,
    kind: "film",
    text: req.body.text
  });
  item.save(function(err, item) {
    if (err) return console.error(err);
  });

  res.send("Review is adding!");
});

module.exports = router;
