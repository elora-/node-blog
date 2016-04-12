var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = require('./../models/post');
var User = require('./../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  Post.find({}, function(err, posts) {
    res.render('index', {
      currentUser: req.user,
      posts: posts});
  });
});

module.exports = router;
