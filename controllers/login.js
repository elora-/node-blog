var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('./../models/user');

router.get('/', function(req, res, next) {
    res.render('login', { title: 'Log In' });
});

router.post('/', passport.authenticate('local',
    {
        successRedirect: '/',
        failureRedirect: '/login'
    }
));

module.exports = router;
