var User = require('./userModel.js');

module.exports = {
  signin: function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({username: username})
    .then(function(user) {
      if (!user) {
        return res.end('user not found');
      }
      return user.comparePassword(password)
      .then(function(isMatch) {
        if (isMatch) {
          return res.end('sending the token! Success!')
        }
        res.end('passwords dont match');
      })
      .catch(function(err) {
        console.log(err);
        res.end(err);
      })
    })
  },

  signup: function(req, res) {
    User.findOne({username: req.body.username})
    .then(function(user) {
      if (user) {
        return res.end('user already exists');
      } else {
        User.create({
          username: req.body.username,
          password: req.body.password
        })
        .then(function(user) {
          console.log('user created', user);
          res.json(user);
        })
      }
    })
  },

  signout: function(req, res) {
    res.end('sign out');
  },

  getUsers: function(req, res) {
    User.find()
    .then(function(users) {
      res.json(users);
    })
  }
};
