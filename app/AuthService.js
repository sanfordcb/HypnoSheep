// import React from 'react';
// import request from 'superagent';
// import LoginAction from './LoginActions'
// var React = require('react');
// var request = require('superagent');
// var LoginAction = require('./LoginActions');

// class Auth {
//   login(username, password) {
//     var user = {
//       username: username,
//       password: password
//     };
//     request.post('auth/signin').send(user).end((err, res) => {
//       if (err || !res.ok) {
//         console.log(err);
//       } else if ( res.text === 'user not found' || res.text === 'passwords dont match'){
//         console.log(res.text);
//       } else {
//         var jwt = res.id_token;
//         console.log('yay, login successful');
//         LoginAction.loginUser(jwt);
//         return true;
//       }
//     });
//   }
// }

// var Auth = React.createClass({
//   login: function(username, password) {
//     var user = {
//       username: username,
//       password: password
//     };
//     request.post('auth/signin').send(user).end((err, res) => {
//       if (err || !res.ok) {
//         console.log(err);
//       } else if ( res.text === 'user not found' || res.text === 'passwords dont match'){
//         console.log(res.text);
//       } else {
//         var jwt = res.id_token;
//         console.log('yay, login successful');
//         LoginAction.loginUser(jwt);
//         return true;
//       }
//     });
//   },

//   // render: {
//   //   return (
//   //     <div>hi</div>
//   //   )
//   // }


// });


//module.exports = Auth;
export default new Auth();