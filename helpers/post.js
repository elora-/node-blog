var Post = require('./../models/post');

module.exports.getPost =  function(req, res, next) {
    var id = req.params.id;

    Post.findById(id, function(err, post) {
        if (err) throw err;

        req.post = post;
        next();
    });
};

module.exports.renderPost =  function(req, res, next) {
    res.render('post', {
        post: req.post,
        currentUser: req.user
    });
};

module.exports.action = function(req, res, next) {
    var action = req.params.action;

    if(action=='delete') {
        req.post.remove(function(err) {
            if (err) throw err;

            res.redirect('/');
        });
    } else if(action=='update') {
        res.render('form', {
            name: req.post.name,
            content: req.post.content,
            title: "Update Post",
            tags: req.post.tags.join(', '),
            currentUser: req.user });
    }
};

module.exports.updatePost = function(req, res, next) {
    Post.updatePost(req.post._id, req.body.title, req.body.content, req.body.tags.toLowerCase().replace(/\s/g, '').split(","), next)
};