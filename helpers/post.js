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
        if(req.user) {
            if(req.user.username == req.post.by) {
                req.post.remove(function(err) {
                    if (err) throw err;

                    res.redirect('/');
                });
            } else {
                res.redirect('/login');
            }
        } else {
            res.redirect('/login');
        }
    } else if(action=='update') {
        res.render('form', {
            name: req.post.name,
            content: req.post.content,
            id: req.post._id,
            title: "Update Post",
            tags: req.post.tags.join(', '),
            currentUser: req.user });
    }
};

module.exports.updatePost = function(req, res, next) {
    if(req.user) {
        if(req.user.username == req.post.by) {
            req.post.name = req.body.title;
            req.post.content = req.body.content;
            req.post.tags = req.body.tags.toLowerCase().replace(/\s/g, '').split(",");

            req.post.save(function(err) {
                if (err) throw err;

                res.redirect('./');
            });
        } else {
            res.redirect('/login')
        }
    } else {
        res.redirect('/login')
    }
};