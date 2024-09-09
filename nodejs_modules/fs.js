// --- filesystem.js --- //

const fs = require('fs');

// Reading a file asynchronously

/* fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log('File content:', data);
});

console.log('This will print before the file content because readFile is asynchronous'); */

/* 
const data = fs.readFileSync('example.txt', 'utf8');

console.log('File content:', data);

console.log('This will print after the file content because readFileSync is synchronous'); */

/* fs.writeFile('example.txt', 'Writing something', (err) => {
    if(err) console.log(err);
}) */

//fs.writeFileSync('example.txt', 'Writing a file in a synchronous way');
/* 
fs.appendFile('example.txt', '\nAppending this new line!', (err) => {
    if(err) return;
});


fs.appendFileSync('example.txt', '\nAppending one more line!'); */




/* fs.mkdir('myDirectory', (err) => {
    if (err) {
        console.error('Error creating directory:', err);
        return;
    }
    console.log('Directory created successfully!');
}); */



/* 
fs.rmdir('./app/mydirectory', (err) => {
    if (err) {
        console.error('Error deleting directory:', err);
        return;
    }
    console.log('Directory deleted successfully!');
});




('example.txt', (err) => {
    if (err) {
        console.error('Error deleting file:', err);
        return;
    }
    console.log('File deleted successfully!');
});



fs.unlinkSync('example.txt'); */





/* fs.mkdirSync('myDirectory');





console.log('App created');
fs.rmdirSync('app');
console.log('App removed'); */

// This time, instead of just passing the file name,
// we pass the path and the file name
//fs.writeFileSync('./myDirectory/file.txt', 'Some text')





// Getting the base name (file name) of a path
const fileName = path.basename('/path/to/example.txt');
console.log(fileName);  // Output: 'example.txt'








// Getting the directory name from a file path
const dirName = path.dirname('/path/to/example.txt');
console.log(dirName);  // Output: '/path/to'







// Getting the file extension from a path
const fileExtension = path.extname('example.txt');
console.log(fileExtension);  // Output: '.txt'