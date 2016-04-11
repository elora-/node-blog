var express = require('express');
var router = express.Router();
var Post = require('./../models/post');

/* GET post */
router.get('/', function(req, res, next) {
    var allTags = [];
    var uniqueTags = [];

    var footerText = '<p><a href="/login">Log In</a><hr /><a href="/signup">Sign Up</a></p>';
    if(req.user) {
      footerText = '<p>Logged in as: ' + req.user.username + '</p>';
    }

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

        res.render('tags', { content: '<li>' + uniqueTags.sort().join('</li><li>') + '</li>', title: 'Tags', footerText: footerText });
    });
});

router.get('/tagged', function(req, res, next) {
    var searchTags = req.query.search.toLowerCase().replace(/\s/g, '').split(",");
    var text = '';
    var footerText = '<p><a href="/login">Log In</a><hr /><a href="/signup">Sign Up</a></p>';
    if(req.user) {
      footerText = '<p>Logged in as: ' + req.user.username + '</p>';
    }

    Post.find({ tags: { $in: searchTags } }, function(err, posts) {
      posts.forEach(function(k, v) {
        text += '<div class="post"><p><a href="/post/' + k._id + '">' + k.name + '</a></p></div><hr />';
      });
      res.render('tagged', { content: text, footerText: footerText })
    });
});

module.exports = router;
