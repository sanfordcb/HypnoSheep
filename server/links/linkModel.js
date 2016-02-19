var mongoose = require('mongoose');

var LinkSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  url: String,
  like: String,
  description: String
});

module.exports = mongoose.model('Link', LinkSchema);
