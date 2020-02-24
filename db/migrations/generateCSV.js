const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();
const generator = require('./seedHelpers.js');


const generate = () => {
  writer.pipe(fs.createWriteStream('./agentData.csv'));
  for (let i = 0; i < 6000000; i++) {
    writer.write(generator.module.generateAgent())
    console.log(i)
  }
  // setTimeout(() => {
  //   for (let i = 5000000; i < 60000000; i++) {
  //     writer.write(generator.module.generateAgent())
  //     console.log(i)
  //   }
  // }, 50000)
}

generate();
