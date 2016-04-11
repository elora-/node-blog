var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('./../models/user');

router.get('/', function(req, res, next) {
    res.render('login', { title: 'Sign Up' });
});

router.post('/', function(req, res, next) {
    var newUser = new User({
        username: req.body.username,
        password: req.body.password,
        admin: false
    });

    newUser.save(function(err) {
        if(err) throw err;
    });

    res.redirect('/');
});

module.exports = router;
