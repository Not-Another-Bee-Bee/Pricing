require('newrelic');
const express = require('express');
const port = 3002;
const path = require('path');
const db = require('../db/queries');

let app = express();
app.set('port', port);

app.use(express.urlencoded({'extended': true}));
app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.get('/api/v1/properties/:id', db.getPropertyById);
app.post('/api/v1/properties/new', db.addNewProperty);
app.put('/api/v1/properties/:id/edit', db.editPropertyById);
app.delete('/api/v1/properties/:id', db.deletePropertyById);

app.get('/api/v1/properties/:id/agents', db.getAgentsByPropertyId);

// start server
app.listen(port, () => {
  console.log('Listening on', port);
});

module.exports = app;
