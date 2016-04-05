var express = require('express');
var router = express.Router();
var Post = require('./../models/post');

/* GET post */
router.get('/', function(req, res, next) {
    Post.find({}, function(err, posts) {
        var uniqueTags = [];
        posts.forEach(function(k, v){
            k.tags.forEach(function(tag) {
                if(!$.inArray(tag, uniqueTags)) {
                    uniqueTags.push(tag);
                }
            });
        });
    });

    res.render('tags', {  });
});

module.exports = router;