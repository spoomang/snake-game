const http = require('http');
const fs = require('fs');

const {getContentType, getFilePath} = require('./utils/utils');
const regex = require('./utils/regex');
const handler = require('./handler')
const direction = require('./service/direction')

const PORT = 8080;

handler.add('/snake/automated/direction', direction.getDirection);

http.createServer((request, response) => {
    let filePath;

    const url = request.url;
    if (regex.isCodeResource(url) || url === '/') {
        if (url === '/') {
            filePath = './dist/index.html';
        } else {
            filePath = getFilePath(url);
        }
    
        fs.readFile(filePath, function(error, content) {
            const contentType = getContentType(filePath);
    
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        });
    } else {
        handler.handle(url, request, response);
    }

}).listen(PORT);
