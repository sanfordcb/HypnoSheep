var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: String
});

module.exports = mongoose.model('Project', ProjectSchema);
