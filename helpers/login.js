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