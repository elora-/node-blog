var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  var Post = require('./../models/post');
  Post.find({}, function(err, posts) {
    var text = "";
    posts.forEach(function(k, v){
      text += '<div class="post"><p><a href="/post/' + k._id + '">' + k.name + '</a></p></div><hr />';
    });
    res.render('index', { content: text });
  });
});

module.exports = router;