const fs = require('fs');
const { Pool } = require('pg');
const path = require('path');
const copyFrom = require('pg-copy-streams').from;

const agentsCSVFilePath = path.join(__dirname, 'agentData.csv');
const pool = new Pool({
  user: 'adriantran',
  host: 'localhost',
  database: 'zillow',
  password: 'poop',
  port: 5432
});

const bulkInsert = (data) => {
  pool.connect((err, client) => {
    var stream = client.query(copyFrom('COPY agents (first_name, last_name, role, phone, profile_img, reviews_count, recent_sales, property_id) FROM STDIN CSV HEADER '));
    var fileStream = fs.createReadStream(data);

    fileStream.on('error', (err) => {
      console.log('error in reading file: ' + err);
    });
    stream.on('error', (err) => {
      console.log('error in reading file: ' + err);
    });
    stream.on('end', () => {
      console.log('completed loading data');
    });
    fileStream.pipe(stream);
  });
}

bulkInsert(agentsCSVFilePath);

module.exports = {
  bulkInsert
};