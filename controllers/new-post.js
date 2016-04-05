var express = require('express');
var router = express.Router();
var Post = require('./../models/post');

/* GET post */
router.get('/', function(req, res, next) {
  res.render('form', { title: "New Post", name: '', tags: '' });
});

router.post('/', function(req, res, next) {
  var newPost = new Post({
    name: req.body.title,
    content: req.body.content,
    tags: req.body.tags.replace(/\s/g, '').split(",")
  });

  newPost.save(function(err) {
    if(err) throw err;
  });

  res.redirect('/');
})

module.exports = router;
