const path = require('path');

// Joining path segments to create a file path
const filePath = path.join(__dirname, 'files', 'example.txt');
console.log(filePath);  // Output will be correct for your OS