var express = require('express');
var router = express.Router();
var Post = require('./../models/post');

/* GET post */
router.get('/', function(req, res, next) {
    var allTags = [];
    var uniqueTags = [];
    var number = 0;

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

        res.render('tags', { content: uniqueTags, title: 'Tags' });
    });
});

module.exports = router;
