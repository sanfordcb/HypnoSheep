var Project = require('./projectModel.js');

module.exports = {
  getProjects: function(req, res) {
    res.end('get projects');
  },

  addProject: function(req, res) {
    res.end('add project');
  }

}
