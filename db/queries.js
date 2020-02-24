const fs = require('fs');
const { Pool } = require('pg');
const path = require('path');
const copyFrom = require('pg-copy-streams').from;

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

// PROPERTY REQUESTS

const getPropertyById = (req, res) => {
  const pid = parseInt(req.params.id);
  pool.query('SELECT * FROM properties WHERE pid = $1', [pid], (err, result) => {
    if (err) {
      // throw err;
    }
    res.status(200).json(result.rows);
  })
}

const addNewProperty = (req, res) => {
  const { price, beds, baths, sqft, address, zip, city, state, status, tour_active, owner_id } = req.body;
  pool.query(`INSERT INTO properties
  (price, beds, baths, sqft, address, zip, city, state, status, tour_active, owner_id, agent_id)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
  [price, beds, baths, sqft, address, zip, city, state, status, tour_active, owner_id], (err, result) => {
    if (err) {
      throw err;
    }
    console.log(res.status(200).json(result.rows));
  })
}

const getAgentsByPropertyId = (req, res) => {
  const pid = parseInt(req.params.id);
  console.log(pid);

  pool.query('select * from agents where $1 = ANY(property_id)', [pid], (err, result) => {
    if (err) {
      throw err;
    }
    console.log(res.status(200).json(result.rows));
  })
}

const editPropertyById = (req, res) => {
  const pid = parseInt(req.params.id);
  const { price, beds, baths, sqft, address, zip, city, state, status, tour_active } = req.body;
  pool.query(`UPDATE properties SET price = $1, beds = $2, baths = $3, sqft = $4, address = $5, zip = $6, city = $7, state = $8, status = $8, tour_active = $9`,
  [price, beds, baths, sqft, address, zip, city, state, status, tour_active], (err) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`Property ${pid} has been modified.`);
  })
}

const deletePropertyById = (req, res) => {
  const pid = parseInt(req.params.id);
  pool.query('DELETE FROM properties WHERE pid = $1', [pid], (err) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`property deleted with PID: ${pid}`)
  })
}

///// CSV imports to SQL
// const properties = 'COPY properties (price, beds, baths, sqft, address, zip, city, state, status, tour_active, owner_id, agent_id) FROM STDIN CSV HEADER';
// const agents = 'COPY agents (first_name, last_name, role, phone, profile_img, reviews_count, recent_sales, property_id) FROM STDIN CSV HEADER';
// const agentCSVFilePath = path.join(__dirname, '/files/agentData.csv');
// const propertyCSVFilePath = path.join(__dirname, 'propertyData.csv');

// bulkInsert(agentCSVFilePath, agents);

module.exports = {
  bulkInsert,
  addNewProperty,
  getPropertyById,
  editPropertyById,
  deletePropertyById,
  getAgentsByPropertyId,
};
