var express = require('express');
var router = express.Router();
var signup = require('../helpers/signup');

router.get('/', signup.renderSignup);

router.post('/', signup.saveUser);

module.exports = router;
