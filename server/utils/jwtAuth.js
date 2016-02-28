var jwt = require('jwt-simple');
var User = require('../users/userModel.js');
var secret = require('./envDefaults.js').jwtSecret;

module.exports = function (req, res, next) {
  // From: http://www.sitepoint.com/using-json-web-tokens-node-js/
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  var decoded;

  if (token === undefined) {
    return res.status(401).end('not authorized');
  }

  try {
    decoded = jwt.decode(token, secret);
    // TODO: Is it actually necessary to find the user?
    // We could technically just check the expiration without searching for user?
    User.findById(decoded.iss)
    .then(function (user) {
      if (decoded.exp >= Date.now()) {
        return next();
      }
      return res.status(401).end('Token Expired');
    })
    .catch(function (err) {
      console.log(err);
      return res.status(401).end('not authorized');
    });
  } catch (err) {
    console.log(err);
    return res.status(401).end('not authorized');
  }
};
