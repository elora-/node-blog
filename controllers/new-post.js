var express = require('express');
var router = express.Router();
var login = require('./../helpers/login');
var newPost = require('../helpers/new-post');

/* GET post */
router.get('/', login.isLoggedIn, newPost.renderForm);

router.post('/', login.isLoggedIn, newPost.savePost);

module.exports = router;
