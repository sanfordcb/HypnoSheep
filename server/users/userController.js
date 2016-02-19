var User = require('./userModel.js');

module.exports = {
  signin: function(req, res) {
    res.end('post signin');
  },

  signup: function(req, res) {
    res.end('post signup');
  }
};
