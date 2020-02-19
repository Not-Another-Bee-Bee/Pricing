const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();
const generator = require('./seed.js');


const generate = () => {
  writer.pipe(fs.createWriteStream('./propertyData.csv'));
  for (let i = 0; i < 5000000; i++) {
    writer.write(generator.module.generateProperty())
    console.log(i)
  }
  setTimeout(() => {
    for (let i = 0; i < 5000000; i++) {
      writer.write(generator.module.generateProperty())
      console.log(i)
    }
  }, 30000)
  console.log('finished generating CSV')
}

generate();
