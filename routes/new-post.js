var express = require('express');
var router = express.Router();

/* GET post */
router.get('/', function(req, res, next) {
  res.render('new-post');
});

router.post('/', function(req, res, next) {
  var Post = require('./../models/post');

  var newPost = new Post({
    name: req.body.title,
    content: req.body.content
  });

  newPost.save(function(err) {
    if(err) throw err;
  });

  res.redirect('./');
})

module.exports = router;
