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


module.exports.findUser = function(req, res, next) {
    var id = req.params.id;

    User.findById(id, function(err, user) {
        if(err) throw err;

        req.updateUser = user;
        next();
    });
};

module.exports.renderEdit = function(req, res, next) {
    var id = req.params.id;
    res.render('edit', {
        currentUser: req.user,
        updateUser: req.updateUser
    });
};

module.exports.saveEdit = function(req, res, next) {
    if(req.user.admin) {
        User.updateAdmin(req.updateUser._id, req.body.admin, function() {
            next();
        });
    }

    next();
};
