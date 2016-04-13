var User = require('./../models/user');

module.exports.getUsers =  function(req, res, next) {
    User.find({}, function(err, users) {
        req.users = users;
        next();
    });
};

module.exports.renderUsers = function(req,res, next) {
    res.render('users', {
        currentUser: req.user,
        users: req.users
    });
};