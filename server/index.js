const express = require('express');
const port = 3002;
const path = require('path');

const retrieve = require('../database/retrieve.js');

var app = express();
app.set('port', port);

app.use(express.urlencoded({'extended': true}));
app.use('/', express.static(path.join(__dirname, '../client/dist')));


app.post('/api/summary/data/new', (req, res) => {
})

app.put('/api/summary/data/:id', (req, res) => {
})

app.delete('/api/summary/data/:id', (req, res) => {
})


app.get('/api/summary/data/:id', (req, res) => {
  var {id} = req.params;
  retrieve(id, (err, data) =>{
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      if (data) {
        res.jsonp(data);
      } else {
        res.send('no house with such id value');
      }
    }
  });
})


// start server
app.listen(port, () => {
  console.log('Listening on', port);
});

module.exports = app;