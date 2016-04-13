var passport = require('passport');
var User = require('./../models/user');

module.exports.logout = function(req, res, next) {
    req.logout();
    res.redirect('/');
};