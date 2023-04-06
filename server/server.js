const http = require('http');
const fs = require('fs');
const path = require('path');

const {getContentType, getFilePath} = require('./utils/utils');

const PORT = 8080;

http.createServer((request, response) => {
    const filePath = getFilePath(request.url);

    fs.readFile(filePath, function(error, content) {
        const contentType = getContentType(filePath);

        response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
    });

}).listen(PORT);
