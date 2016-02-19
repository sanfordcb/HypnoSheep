var mongoose = require('mongoose');

var url = process.env.MONGOLAB_URI || 'mongodb://127.0.0.1/hypnosheep'

mongoose.connect(url)

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to the database'));

db.once('open', function() {
  console.log('Connected to database!')
})

module.exports = db;
