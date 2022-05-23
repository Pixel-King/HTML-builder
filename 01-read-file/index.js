const fs = require('fs');
const path = require('path');

const baseStream = fs.createReadStream(path.join(__dirname, 'text.txt'), {encoding: 'utf-8'});
baseStream.on('data', data => console.log("\n" + data));
