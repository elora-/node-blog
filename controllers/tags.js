var express = require('express');
var router = express.Router();
var Post = require('./../models/post');

/* GET post */
router.get('/', function(req, res, next) {
    var allTags = [];
    var uniqueTags = [];

    Post.find({}, function(err, posts) {
        posts.forEach(function(k, v){
          k.tags.forEach(function(tag) {
            allTags.push(tag);
          });
        });

        allTags.forEach(function(tag) {
          if(uniqueTags.indexOf(tag) == -1) {
            uniqueTags.push(tag);
          }
        });

        res.render('tags', {
            tags: uniqueTags.sort(),
            currentUser: req.user });
    });
});

router.get('/tagged', function(req, res, next) {
    var searchTags = req.query.search.toLowerCase().replace(/\s/g, '').split(",");

    Post.find({ tags: { $in: searchTags } }, function(err, posts) {
      res.render('tagged', {
          currentUser: req.user,
          posts: posts });
    });
});

module.exports = router;
