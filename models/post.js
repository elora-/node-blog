var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

});

var Schema = mongoose.Schema;

var postSchema = new Schema({
  name: String,
  content: String,
  tags: Array,
  created_at: Date,
  updated_at: Date,
  by: String
});

postSchema.pre('save', function(next) {
  var currentDate = new Date();

  this.updated_at = currentDate;

  if(!this.created_at)
    this.created_at = currentDate;

  next();
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
