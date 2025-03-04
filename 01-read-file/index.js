const fs = require('fs');
const path = require('path');

const readableStream = fs.createReadStream(path.join('01-read-file', 'text.txt'), 'utf-8');

let data = '';

readableStream.on('data', chunk => data += chunk);
readableStream.on('end', () => console.log(data));
readableStream.on('error', error => console.log('Error', error.message));