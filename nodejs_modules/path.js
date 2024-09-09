

const path = require('path');

// Joining path segments to create a file path
const filePath = path.join(__dirname, 'files', 'example.txt');
console.log(filePath);  // Output will be correct for your OS



// Resolving a path to get the absolute path
const absolutePath = path.resolve('files', 'example.txt');
console.log(absolutePath);  // Outputs the absolute path to 'example.txt'