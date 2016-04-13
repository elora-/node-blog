var express = require('express');
var router = express.Router();

var login = require('../helpers/login');
var post = require('./../helpers/post');

/* GET post */
router.get('/:id', post.getPost, post.renderPost);

router.get('/:id/:action', login.isLoggedIn, post.getPost, login.isAuthor, post.action);

router.post('/:id/update', login.isLoggedIn, post.getPost, login.isAuthor, post.updatePost, function(req, res, next) {
    res.redirect('/');
});

module.exports = router;
