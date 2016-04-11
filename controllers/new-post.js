var express = require('express');
var router = express.Router();
var Post = require('./../models/post');

/* GET post */
router.get('/', function(req, res, next) {
  var footerText = '<p><a href="/login">Log In</a><hr /><a href="/signup">Sign Up</a></p>';
  if(req.user) {
    footerText = '<p>Logged in as: ' + req.user.username + '</p>';
  }
  res.render('form', { title: "New Post", name: '', tags: '', footerText: footerText });
});

router.post('/', function(req, res, next) {
  if(req.user) {
    if(req.user.admin) {
      var newPost = new Post({
        name: req.body.title,
        content: req.body.content,
        tags: req.body.tags.toLowerCase().replace(/\s/g, '').split(",").sort(),
        by: req.user.username
      });

      newPost.save(function(err) {
        if(err) throw err;
      });
      res.redirect('/');
    } else {
      res.redirect('/login');
    }
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
