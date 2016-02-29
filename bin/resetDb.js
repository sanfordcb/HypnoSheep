/* eslint-disable strict */
'use strict';

const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1/hypnosheep';

mongoose
  .connect(url)
  .then(() => mongoose.connection.db.dropDatabase()
    .then(() => console.log('database dropped'))
  )
  .then(() => mongoose.disconnect());
