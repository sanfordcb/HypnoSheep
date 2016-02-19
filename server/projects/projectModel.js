var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
  user: String,
  name: String
});

module.exports = mongoose.model('Project', ProjectSchema);
