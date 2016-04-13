var express = require('express');
var router = express.Router();
var index = require('../helpers/index');

/* GET home page. */
router.get('/', index.getPosts, index.renderPosts);

module.exports = router;
