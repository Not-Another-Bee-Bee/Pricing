const express = require('express');
const port = 3002;
const path = require('path');
const queries = require('../db/queries');


let app = express();
app.set('port', port);

app.use(express.urlencoded({'extended': true}));
app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.post('/api/v1/properties/new', (req, res) => {})

app.get('/api/v1/properties/:id', (req, res) => {})

app.put('/api/v1/properties/:id', (req, res) => {})

app.delete('/api/v1/properties/:id', (req, res) => {})


// start server
app.listen(port, () => {
  console.log('Listening on', port);
});

module.exports = app;