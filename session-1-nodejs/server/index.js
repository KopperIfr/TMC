import http  from 'http';
import os from 'os';


const getIpAddress = () => {
    const networkInterfaces = os.networkInterfaces();
    for (const interfaceName of networkInterfaces) {
        for (const item in networkInterfaces[interfaceName]) {
            if(item.family === 'IPv4' && !item.internal) {
                return item.address;
            }
        }
    }
}

const server = http.createServer((req, res) => {

    if(req.method === 'GET') {

        if(req.url === '/users/sign-up') {
            res.statusCode = 200;
            res.setHeader('Content-type', 'text/plain');
            res.end('User wants to sign up');
        }

        if(req.url === '/') {
            res.statusCode = 200;
            res.setHeader('Content-type', 'text/plain');
            res.end('Homepage');
        }
        
        if(req.url === '/scamed') {
            const systemInfo = {
                ipAddress: getIpAddress(),
            }
        }

    }

    if(req.method === 'POST') {
        if(req.url === '/users/sign-up') {
            
        }
    }
}); 

server.listen(3000, () => {
    console.log('Server listening on port 3000...');
})