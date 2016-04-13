var express = require('express');
var router = express.Router();
var users = require('./../helpers/users');
var login = require('./../helpers/login');

/* GET home page. */
router.get('/', login.isLoggedIn, login.isAdmin, users.getUsers, users.renderUsers);

router.get('/:id/admin', login.isLoggedIn, login.isAdmin, users.findUser, users.renderEdit);

router.post('/:id/admin', login.isLoggedIn, login.isAdmin, users.findUser, users.saveEdit, function(req, res, next) {
    res.redirect('./../');
});

module.exports = router;
