var Post = require('./../models/post');

module.exports.getPosts =  function(req, res, next) {
    var id = req.params.id;

    Post.find({}, function(err, posts) {
        if (err) throw err;

        req.posts = posts;
        next();
    });
};

module.exports.getUniqueTags = function(req, res, next) {
    var allTags = [];
    req.uniqueTags = [];

    req.posts.forEach(function(k, v){
        k.tags.forEach(function(tag) {
            allTags.push(tag);
        });
    });

    allTags.forEach(function(tag) {
        if(req.uniqueTags.indexOf(tag) == -1) {
            req.uniqueTags.push(tag);
        }
    });

    next();
};

module.exports.renderUniqueTags = function(req, res, next) {
    res.render('tags', {
        tags: req.uniqueTags.sort(),
        currentUser: req.user
    });
};

module.exports.getTaggedPosts = function(req, res, next) {
    var searchTags = req.query.search.toLowerCase().replace(/\s/g, '').split(",");

    Post.find({ tags: { $in: searchTags } }, function(err, posts) {
        if (err) throw err;

        req.posts = posts;
        next();
    });
};

module.exports.renderTaggedPosts = function(req, res, next) {
    res.render('tagged', {
        currentUser: req.user,
        posts: req.posts
    });
};