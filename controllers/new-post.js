var express = require('express');
var router = express.Router();

var newPost = require('../helpers/new-post');

/* GET post */
router.get('/', newPost.renderForm);

router.post('/', newPost.savePost);

module.exports = router;
