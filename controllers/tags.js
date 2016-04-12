var express = require('express');
var router = express.Router();
var Post = require('./../models/post');

/* GET post */
router.get('/', function(req, res, next) {
    var allTags = [];
    var uniqueTags = [];

    var footerText = '<div class="col-md-11"><p><a href="/login">Log In</a></div><div class="col-md-1"><a href="/signup">Sign Up</a></p></div>';
    if(req.user) {
      footerText = '<div class="col-md-11"><p>Logged in as: ' + req.user.username + '</p></div><div class="col-md-1"><a href="/logout">Logout</a></p></div>';
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
    var footerText = '<div class="col-md-11"><p><a href="/login">Log In</a></div><div class="col-md-1"><a href="/signup">Sign Up</a></p></div>';
    if(req.user) {
      footerText = '<div class="col-md-11"><p>Logged in as: ' + req.user.username + '</p></div><div class="col-md-1"><a href="/logout">Logout</a></p></div>';
    }

    Post.find({ tags: { $in: searchTags } }, function(err, posts) {
      posts.forEach(function(k, v) {
        text += '<div class="post"><p><a href="/post/' + k._id + '">' + k.name + '</a></p></div><hr />';
      });
      res.render('tagged', { content: text, footerText: footerText })
    });
});

module.exports = router;
