var Link = require('./linkModel.js');

module.exports = {
  getLinks: function(req, res) {
    res.end('get links');
  },

  addLink: function(req, res) {
    res.end('add link');
  }
}
