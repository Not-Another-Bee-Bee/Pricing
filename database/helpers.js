const mongoose = require('mongoose');
const House = require('./schema.js'); // model built for database

const dbName = '7-xillow'             // database name

// const url = process.env.NODE_ENV === 'production' ? 'database' : 'localhost';

const retrieve = (id, callback) => {
  mongoose.connect(`mongodb://localhost:27017/${dbName}`, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => { return House.findOne({id: id}, {_id:0, __v:0}) })
    .then((data) => {
      callback(null, data);
    })
    .catch((err) => {
      callback(err, null);
    });
};

module.exports = {
  retrieve
}

