var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = require('./../models/post');

/* GET post */
router.get('/:id', function(req, res, next) {
  var id = req.params.id;

  Post.findById(id, function(err, post) {
    if (err) throw err;

    res.render('post', {
      post: post,
      currentUser: req.user });
  });
});

router.get('/:id/:action', function(req, res, next) {
  var id = req.params.id;
  var action = req.params.action;

  Post.findById(id, function(err, post) {
    if(err) throw err;

    if(action=='delete') {
      if(req.user) {
        if(req.user.username == post.by) {
          post.remove(function(err) {
            if (err) throw err;

            res.redirect('/');
          });
        } else {
          res.redirect('/login');
        }
      } else {
        res.redirect('/login');
      }
    } else if(action=='update') {
      res.render('form', {
        name: post.name,
        content: post.content,
        id: post._id,
        title: "Update Post",
        tags: post.tags.join(', '),
        currentUser: req.user });
    }
  });
});

router.post('/:id/update', function(req, res, next) {
  var id = req.params.id;
  
  Post.findById(id, function(err, post) {
    if(err) throw err;

    if(req.user) {
      if(req.user.username == post.by) {
        post.name = req.body.title;
        post.content = req.body.content;
        post.tags = req.body.tags.toLowerCase().replace(/\s/g, '').split(",");

        post.save(function(err) {
          if (err) throw err;

          res.redirect('./');
        });
      } else {
        res.redirect('/login')
      }
    } else {
      res.redirect('/login')
    }
  });
});

module.exports = router;
