const fs = require('fs');
const { Pool } = require('pg');
const path = require('path');
const copyFrom = require('pg-copy-streams').from;

const agentCSVFilePath = path.join(__dirname, 'agentData.csv');
const propertyCSVFilePath = path.join(__dirname, 'propertyData.csv');

const pool = new Pool({
  user: 'adriantran',
  host: 'localhost',
  database: 'zillow',
  password: 'poop',
  port: 5432
});

const bulkInsert = (data, properties) => {
  pool.connect((err, client) => {
    var stream = client.query(copyFrom(properties));
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

const properties = 'COPY properties (price, beds, baths, sqft, address, zip, city, state, status, tour_active, owner_id, agent_id) FROM STDIN CSV HEADER';
const agents = 'COPY properties (first_name, last_name, role, phone, profile_img, reviews_count, recent_sales, property_id) FROM STDIN CSV HEADER';
// bulkInsert();

module.exports = {
  bulkInsert
};