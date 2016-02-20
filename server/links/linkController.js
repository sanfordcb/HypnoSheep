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

  addLink: function(req, res) {
    var projectId = req.body.projectId;
    if (!projectId) {
      res.end('ProjectId required');
    }
    Link.create({
      project: projectId,
      url: req.body.url
    }).then(function(link) {
      res.json(link);
    })
    .catch(function(err) {
      console.log(err);
      res.end(err);
    })
  },

  updateLink: function(req, res) {
    var linkId = req.params.linkId;
    if (!linkId) {
      return res.end('LinkId required');
    }
    Link.findByIdAndUpdate(linkId, req.body)
    .then(function(link) {
      if (!link) {
        return res.end('link not found');
      }
      res.json(link)
    })
    .catch(function(err) {
      console.log(err)
      res.end(err)
    })
  }, 

  deleteLink: function(req, res) {
    Link.remove({
      _id: req.params.linkId
    })
    .then(function(){
      res.end('Link deleted.');
    })
    .catch(function(err) {
      res.end(err);
    })
  }
}





