var Project = require('./projectModel.js');

module.exports = {
  getProjects: function(req, res) {
    Project.find()
    .then(function(projects) {
      res.json(projects);
    })
    .catch(function(){
      res.end("Error getting projects.")
    });
  },

  addProject: function(req, res) {
    Project.create({
      name: req.body.name,
    })
    .then(function(project){
      res.json(project);
    })
    .catch(function(){
      res.end("Error adding project.")
    });
  }, 

  deleteProject: function(req, res) {
    Project.remove({
      _id: req.params.project_id
    })
    .then(function(){
      res.end("Project deleted.");
      console.log("Project deleted");
    })
    .catch(function(){
      res.end("Error deleting object.")
    });
  }

}