var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var post = require('./../helpers/post');

/* GET post */
router.get('/:id', post.getPost, post.renderPost);

router.get('/:id/:action', post.getPost, post.action);

router.post('/:id/update', post.getPost, post.updatePost);

module.exports = router;
