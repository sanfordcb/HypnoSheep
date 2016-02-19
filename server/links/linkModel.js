var mongoose = require('mongoose');

var LinkSchema = new mongoose.Schema({
  project: String,
  url: String,
  like: String,
  description: String
});

module.exports = mongoose.model('Link', LinkSchema);
