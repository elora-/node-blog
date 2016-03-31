var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET post */
router.get('/', function(req, res, next) {
  var Post = require('./../models/post');
  var id = req.query.id;
  console.log(id);
  Post.findById(id, function(err, post) {
    if (err) throw err;

    res.render('post', { name: post.name, content: post.content, created_at: post.created_at, updated_at: post.updated_at });
  });
});

module.exports = router;
