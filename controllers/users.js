var express = require('express');
var router = express.Router();
var users = require('./../helpers/users');

/* GET home page. */
router.get('/', users.getUsers, users.renderUsers);

module.exports = router;
