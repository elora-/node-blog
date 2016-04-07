var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('./../models/user');

router.get('/', function(req, res, next) {
    var footerText = '<p><a href="/login">Log In</a><hr /><a href="/signup">Sign Up</a></p>';
    if(req.user) {
        footerText = '<p>Logged in as: ' + req.user.username + '</p>';
    }
    res.render('login', { footerText: footerText });
});

router.post('/', passport.authenticate('local',
    {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true,
        failureMessage: "Invalid username or password"
    }
));

module.exports = router;