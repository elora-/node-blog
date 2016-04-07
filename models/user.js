var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

});

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String
}, {collection: 'users'});

userSchema.pre('save', function(next, done) {
    if(User.findOne({ username: this.username }) == null) {
        next();
    } else {
        done();
    }
});

var User = mongoose.model('User', userSchema);

module.exports = User;
