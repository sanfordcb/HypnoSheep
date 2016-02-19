var Link = require('./linkModel.js');
var Project = require('../projects/projectModel.js');

module.exports = {
  // Get all the links
  getLinks: function(req, res) {
    Link.find()
    .then(function(links) {
      res.json(links);
    });
  },

  // Get all links for a specific project
  getLinksByProject: function(req, res) {
    var projectId = req.params.projectId;
    Project.findOne({_id: projectId})
    .then(function(project) {
      if (!project) {
        return res.end('project not found');
      }
      Link.find({project: project._id})
      .then(function(links) {
        res.json(links);
      })
    })
    .catch(function(err) {
      console.log(err);
      res.end(err);
    })
  },

  // TODO:
  addLink: function(req, res) {
    res.end('add link');
  }
}
