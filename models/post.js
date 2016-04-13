var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var postSchema = new Schema({
  name: String,
  content: String,
  tags: Array,
  created_at: Date,
  updated_at: Date,
  by: String
});

postSchema.statics.updatePost = function(id, title, content, tags, cb) {
  this.update({_id: id}, {$set: { name: title, content: content, tags: tags }}, cb);
};

postSchema.pre('save', function(next) {
  var currentDate = new Date();

  this.updated_at = currentDate;

  if(!this.created_at)
    this.created_at = currentDate;

  next();
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
