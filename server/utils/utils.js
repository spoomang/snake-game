const path = require('path');

function getContentType(filePath) {
    const extname = path.extname(filePath);
    let contentType = 'text/html';

    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
        }
    return contentType;
}

function getFilePath(fileUrl) {
    return "."+fileUrl;
}

function getUrlToComponents(url) {
    const result = {
        path: '',
        paramsMap: {},
    }
    if (!url) {
        return result;
    }

    const urlComponents = url.split('?');
    if (urlComponents.length == 0) {
        return result;
    }
    result.path = urlComponents[0];

    if (urlComponents.length > 1) {
        const pathParamsList = urlComponents[1].split('&');
        for (let i = 0; i < pathParamsList.length; i++) {
            const keyValue = pathParamsList[i].split('=');
            if (keyValue.length == 2) {
                result.paramsMap[keyValue[0]] = keyValue[1];
            }
        }
    }

    return result;
}

module.exports = {
    getContentType,
    getFilePath,
    getUrlToComponents,
};
