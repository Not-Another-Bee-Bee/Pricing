const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();
const generator = require('./seed.js');

const generateAgents = () => {
  writer.pipe(fs.createWriteStream('./propertyData.csv'));
  for (let i = 0; i < 10000000; i++) {
    writer.write(generator.module.generateProperty())
    if (i === 1000000) {
      console.log(i)
    }
    if (i === 2000000) {
      console.log(i)
    }
    if (i === 3000000) {
      console.log(i)
    }
    if (i === 4000000) {
      console.log(i)
    }
    if (i === 5000000) {
      console.log(i)
    }
    if (i === 6000000) {
      console.log(i)
    }
    if (i === 7000000) {
      console.log(i)
    }
    if (i === 8000000) {
      console.log(i)
    }
    if (i === 9000000) {
      console.log(i)
    }
    if (i === 9500000) {
      console.log(i)
    }
    if (i === 9750000) {
      console.log(i)
    }
  }
  console.log('finished generating CSV')
}

generateAgents();
