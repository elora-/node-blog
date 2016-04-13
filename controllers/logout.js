var express = require('express');
var router = express.Router();
var logout = require('../helpers/logout');

router.get('/', logout.logout);

module.exports = router;
