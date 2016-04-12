var express = require('express');
var router = express.Router();
var Post = require('./../models/post');

/* GET post */
router.get('/', function(req, res, next) {
  res.render('form', {
    title: "New Post",
    name: '',
    tags: '',
    currentUser: req.user });
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
