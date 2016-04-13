var express = require('express');
var router = express.Router();
var login = require('../helpers/login');

router.get('/', login.renderLogin);

router.post('/', login.login);

module.exports = router;
