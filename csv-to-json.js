// Importing modules: fs, path, csvtojson
const fs = require('fs');
const myCsvFilePath = 'customer-data.csv';

function csvToJson(csvFilePath) {
  // Use fs module to read the csv file and extract the data
  fs.readFile(csvFilePath, 'utf-8', (err, data) => {

    if (err) 
      return console.error(err);

    let lines = data.split('\r\n');
    const keys = lines.shift().split(',');
    const objs = [];

    // Iterate through each line of the lines array (more specifically, each value) and create an array of objects 
    for(let line of lines) {

      // The remaining lines (after removing the keys from the csv file) are the values of each key-value pair
      const values = line.split(',');
      const obj = {};

      keys.forEach((key, i) => {
        obj[key] = values[i];
      })

      objs.push(obj);
    }
    // Delete last object, which doesn't represent any useful data
    objs.pop();

    // Create a json from the objs array and save it in a new file 
    fs.writeFileSync('customer-data.json', JSON.stringify(objs, null, '\t'))
  })
}

csvToJson(myCsvFilePath);


