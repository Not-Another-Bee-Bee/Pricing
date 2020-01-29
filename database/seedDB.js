const House = require('./schema.js');
const mongoose = require('mongoose');
const faker = require('faker');       // module to generate fake information

const dbName = '7-xillow'       // database name
const nData = 100;              // number of data(document) to be seeded

mongoose.connect(`mongodb://localhost:27017/${dbName}`, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => { return House.countDocuments() })
  .then((number) => {
    if(number > 0) { // check if there is any previously seeded data
      House.deleteMany({}) // delete all previously seeded data
        .then(() => { saveNData(nData); }) // seed DB with n number of data
        .catch((err)=> {console.log('Error in deleting previously generated data')})
    } else {
      saveNData(nData); // if there is no previously seeded data, just seed DB with n number of data
    }
  })


var saveNData = (n) => { //helper function for seeding n data into database
  console.log(`START: generating and inserting ${n} sample data of house to database (MongoDB)`);

  var temp = Array(n).fill(0);

  var promiseAll = Promise.all( // use promise 
    temp.map((ele,i) => {
      var randomVal = Math.random(); // will be used to determine status value
      
      let property = new House({ // generate random information for each house(documnet)
        id: i+1,
        price: faker.fake("{{commerce.price}}"),
        bd: Math.ceil(Math.random()*6),
        ba: Math.ceil(Math.random()*7)/2,
        sqft: faker.fake("{{random.number}}"),
        address: faker.fake("{{address.streetAddress}} {{address.secondaryAddress}}, {{address.city}}, {{address.stateAbbr}} {{address.zipCode}}"),
        status: (randomVal < 2/3) ? 'For sale' :
                (randomVal < 5/6) ? 'For rent' : 'Sold',
        tour_button: faker.fake("{{random.boolean}}"),
        zestimate : faker.fake("{{commerce.price}}"),   
        estPayment: faker.fake("{{commerce.price}}")    
      });  
      
      return property.save();; // save each property in table(collection) and return promise generated by save method
    })
  );

  promiseAll
    .then((log) => { // check if every property document is saved in table(collection) 'summaries'
      console.log(`END: generating and inserting ${n} sample data`); 
      mongoose.connection.close(); // close the connection to MongoDB
    })
    .catch((err) => {
      console.log(err);
    });
};