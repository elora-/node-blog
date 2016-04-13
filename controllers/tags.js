var express = require('express');
var router = express.Router();
var tags = require('./../helpers/tags');

/* GET post */
router.get('/', tags.getPosts, tags.getUniqueTags, tags.renderUniqueTags);

router.get('/tagged', tags.getTaggedPosts, tags.renderTaggedPosts);

module.exports = router;
