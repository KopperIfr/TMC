import fs from 'fs';

// 1. Reading files..
let text = fs.readFileSync('example.txt', 'utf8');
console.log(text);

// session1-nodejs/example.txt

// 2. Writing / Creating files..
//fs.writeFileSync('./files/example-2.txt', "This file was created!");
//text = fs.readFileSync('./files/example-2.txt', 'utf8');

// 3. Creating folders..
//fs.mkdirSync('./files');

// 4. Delete folders..
// fs.unlinkSync('./files/example-2.txt');
// fs.rmdirSync('./files');

// 5. Appending content..
//fs.appendFileSync('example.txt', 'Arthuro is fine');