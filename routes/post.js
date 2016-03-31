var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET post */
router.get('/:id', function(req, res, next) {
  var Post = require('./../models/post');
  var id = req.params.id;
  console.log(id);
  Post.findById(id, function(err, post) {
    if (err) throw err;

    res.render('post', { name: post.name, content: post.content, created_at: post.created_at, updated_at: post.updated_at, id: post._id });
  });
});

router.get('/:id/:action', function(req, res, next) {
  var Post = require('./../models/post');
  var id = req.params.id;
  var action = req.params.action;
  Post.findById(id, function(err, post) {
    if(err) throw err;

    if(action=='delete') {
      post.remove(function(err) {
        if (err) throw err;

        res.redirect('/');
      });
    } else if(action=='update') {
      res.render('form', { name: post.name, content: post.content, id: post._id, title: "Update Post" });
    }
  });
});

router.post('/:id/:action', function(req, res, next) {
  var Post = require('./../models/post');
  var id = req.params.id;
  var action = req.params.action;

  Post.findById(id, function(err, post) {
    if(err) throw err;

    if(action=='update') {
      post.name = req.body.title;
      post.content = req.body.content;

      post.save(function(err) {
        if (err) throw err;

        res.redirect('./');
      });
    }
  });
});

module.exports = router;
