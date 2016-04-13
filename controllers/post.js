var express = require('express');
var router = express.Router();

var login = require('../helpers/login');
var post = require('./../helpers/post');

/* GET post */
router.get('/:id', post.getPost, post.renderPost);

router.get('/:id/:action', login.isLoggedIn, post.getPost, post.action);

router.post('/:id/update', login.isLoggedIn, post.getPost, post.updatePost);

module.exports = router;
