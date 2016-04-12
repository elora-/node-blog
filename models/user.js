var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

});

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String,
    admin: Boolean
});

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