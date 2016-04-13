var Post = require('./../models/post');

module.exports.renderForm =  function(req, res, next) {
    res.render('form', {
        title: "New Post",
        name: '',
        tags: '',
        currentUser: req.user
    });
};

module.exports.savePost = function(req, res, next) {
    if(req.user) {
        if(req.user.admin) {
            var newPost = new Post({
                name: req.body.title,
                content: req.body.content,
                tags: req.body.tags.toLowerCase().replace(/\s/g, '').split(",").sort(),
                by: req.user.username
            });

            newPost.save(function(err) {
                if(err) throw err;
            });
            res.redirect('/');
        } else {
            res.redirect('/login');
        }
    } else {
        res.redirect('/login');
    }
};