const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if(req.url === '/favicon.ico') {
        res.writeHead(200);
        res.end();
        return;
    }

    res.writeHead(200);
    if(req.url === '/') {
        fs.createReadStream(__dirname + '/index.html').pipe(res);
    }
});

server.listen(3000, '127.0.0.1', () => {
    console.log('http服务运行在 http:127.0.0.1:3000');
})