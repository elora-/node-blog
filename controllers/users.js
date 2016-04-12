var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = require('./../models/post');
var User = require('./../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  User.find({}, function(err, users) {
    res.render('users', {
      currentUser: req.user,
      users: users });
  });
});

module.exports = router;
