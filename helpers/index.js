var Post = require('./../models/post');

module.exports.getPosts =  function(req, res, next) {
    Post.find({}, function(err, posts) {
        if (err) throw err;

        req.posts = posts;
        next();
    });
};

module.exports.renderPosts =  function(req, res, next) {
    res.render('index', {
        currentUser: req.user,
        posts: req.posts
    });
};