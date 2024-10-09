

const http = require('http')

// Create the server
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        // Home route
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Welcome to the Home Page!\n');
    }
});

// Listen on port 3000
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});


