var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String,
    admin: Boolean
});

userSchema.statics.updateAdmin = function(_id, admin, cb) {
    User.update({_id: _id}, {$set: {admin: admin}}, cb);
};

userSchema.pre('save', function(next, done) {
  User.findOne({ username: this.username }, function(err, user) {
    if(user == null) {
      next();
    } else {
      done(null, false);
    }
  });
});

var User = mongoose.model('User', userSchema);

module.exports = User;
