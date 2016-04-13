var passport = require('passport');
var User = require('./../models/user');

module.exports.renderSignup =  function(req, res, next) {
    res.render('login', { title: 'Sign Up' });
};

module.exports.saveUser =  function(req, res, next) {
    var newUser = new User({
        username: req.body.username,
        password: req.body.password,
        admin: false
    });

    newUser.save(function(err) {
        if(err) throw err;
    });

    res.redirect('/');
};