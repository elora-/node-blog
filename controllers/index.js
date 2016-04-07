var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = require('./../models/post');
var User = require('./../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  Post.find({}, function(err, posts) {
    var text = "";
    var footerText = '<p><a href="/login">Log In</a><hr /><a href="/signup">Sign Up</a></p>';
    if(req.user) {
      footerText = '<p>Logged in as: ' + req.user.username + '</p>';
    }
    posts.forEach(function(k, v){
      text += '<div class="post"><p><a href="/post/' + k._id + '">' + k.name + '</a></p></div><hr />';
    });
    res.render('index', { content: text, footerText: footerText });
  });
});

module.exports = router;
