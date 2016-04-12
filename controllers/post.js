var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = require('./../models/post');

/* GET post */
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  var footerText = '<p><a href="/login">Log In</a><hr /><a href="/signup">Sign Up</a></p>';
  if(req.user) {
    footerText = '<p>Logged in as: ' + req.user.username + '</p>';
  }
  Post.findById(id, function(err, post) {
    if (err) throw err;

    res.render('post', { name: post.name, content: post.content, tags: post.tags.join(', '), created_at: post.created_at, updated_at: post.updated_at, id: post._id, footerText: footerText, by: post.by });
  });
});

router.get('/:id/:action', function(req, res, next) {
  var id = req.params.id;
  var action = req.params.action;
  var footerText = '<div class="col-md-11"><p><a href="/login">Log In</a></div><div class="col-md-1"><a href="/signup">Sign Up</a></p></div>';
  if(req.user) {
    footerText = '<div class="col-md-11"><p>Logged in as: ' + req.user.username + '</p></div><div class="col-md-1"><a href="/logout">Logout</a></p></div>';
  }
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
      res.render('form', { name: post.name, content: post.content, id: post._id, title: "Update Post", tags: post.tags.join(', '), footerText: footerText });
    }
  });
});

router.post('/:id/update', function(req, res, next) {
  var id = req.params.id;
  var action = req.params.action;

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
