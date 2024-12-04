import path from 'path';

// 1. Creating a new path
const newPath = path.join('first', 'second', 'index.js');

// 2. Getting the absolute path
path.resolve('folder', 'example.txt')

// 3. Getting file name of that path..
console.log(path.basename('folder/example.txt'));

// 4. Getting folder from our path..
console.log(path.dirname('folder/example.txt'));

// 5. Getting extension..
console.log(path.extname('folder/example.txt'));