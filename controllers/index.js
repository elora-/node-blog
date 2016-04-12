var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = require('./../models/post');
var User = require('./../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  Post.find({}, function(err, posts) {
    var text = "";
    var footerText = '<div class="col-md-11"><p><a href="/login">Log In</a></div><div class="col-md-1"><a href="/signup">Sign Up</a></p></div>';
    if(req.user) {
      footerText = '<div class="col-md-11"><p>Logged in as: ' + req.user.username + '</p></div><div class="col-md-1"><a href="/logout">Logout</a></p></div>';
    }
    posts.forEach(function(k, v){
      text += '<div class="post"><p><a href="/post/' + k._id + '">' + k.name + '</a></p></div><hr />';
    });
    res.render('index', { content: text, footerText: footerText });
  });
});

module.exports = router;
