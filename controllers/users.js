var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = require('./../models/post');
var User = require('./../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  User.find({}, function(err, users) {
    var text = "";
    var footerText = '<p><a href="/login">Log In</a><hr /><a href="/signup">Sign Up</a></p>';
    if(req.user) {
      footerText = '<p>Logged in as: ' + req.user.username + '</p>';
    }
    users.forEach(function(k, v){
      text += '<tr><td>' + k.username + '</td><td>' + k.password + '</td><td>' + k.admin + '</td></tr>';
    });
    res.render('users', { content: text, footerText: footerText });
  });
});

module.exports = router;
