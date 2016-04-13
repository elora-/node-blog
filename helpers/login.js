var passport = require('passport');
var User = require('./../models/user');

module.exports.renderLogin =  function(req, res, next) {
    res.render('login', { title: 'Log In' });
};

module.exports.login = passport.authenticate('local',
{
    successRedirect: '/',
    failureRedirect: '/login'
});

module.exports.isLoggedIn = function(req, res, next) {
    if(req.user)
        next();
    else
        res.redirect('/login');
};

module.exports.isAdmin = function(req, res, next) {
    if(req.user.admin)
        next();
    else
        res.redirect('/');
};