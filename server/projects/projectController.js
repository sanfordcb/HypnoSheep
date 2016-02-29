var Project = require('./projectModel.js');
var User = require('../users/userModel.js');

module.exports = {
  getProjects: function (req, res) {
    Project.find()
    .then(function (projects) {
      res.json(projects);
    })
    .catch(function (err) {
      console.log(err);
      return res.end('Error getting projects.');
    });
  },

  getProjectsByUserId: function (req, res) {
    var userId = req.params.userId;
    User.findOne({ _id: userId })
    .then(function (user) {
      if (!user) {
        return res.end('User does not exist');
      }
      Project.find({ user: user._id })
      .then(function (projects) {
        res.json(projects);
      });
    })
    .catch(function (err) {
      console.log(err);
      return res.end('Error getting projects');
    });
  },

  getProjectsByUserName: function (req, res) {
    var userName = req.params.userName;
    User.findOne({ username: userName })
    .then(function (user) {
      if (!user) {
        return res.end('User does not exist');
      }
      Project.find({ user: user._id })
      .then(function (projects) {
        res.json(projects);
      });
    })
    .catch(function (err) {
      console.log(err);
      return res.end('Error getting projects');
    });
  },

  addProject: function (req, res) {
    var userName = req.body.userName;
    if (!userName) {
      return res.send('userName required');
    }
    User.findOne({ username: userName })
    .then(function(user) {
      if (!user) {
        return res.end('User does not exist');
      }
      Project.create({
        user: user._id,
        name: req.body.name
      })
      .then(function (project) {
        res.json(project);
      })
      .catch(function (err) {
        console.log(err);
        return res.end('Error adding project');
      });
    })
    .catch(function (err) {
      console.log(err);
      return res.end('Error getting projects');
    });
  },

  deleteProject: function (req, res) {
    Project.remove({
      _id: req.params.project_id
    })
    .then(function () {
      res.end('Project deleted.');
      console.log('Project deleted');
    })
    .catch(function (err) {
      console.log(err);
      res.end('Error deleting object.');
    });
  }
};
