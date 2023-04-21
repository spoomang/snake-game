const { getUrlToComponents } = require('../utils/utils');

function Handler() {
    this.handlerMap = new Map();
}

Handler.prototype.add = function(path, handler) {
    this.handlerMap.set(path, handler)
}

Handler.prototype.handle = function(url, request, response) {

    const { path, paramsMap } = getUrlToComponents(url);

    if (this.handlerMap.has(path)) {
        request.pathParamsMap = paramsMap;
        this.handlerMap.get(path)(request, response);
    } else {
        console.log('no path exist..');
        response.writeHead(404, { 'Content-Type': "contentType" });
        response.end("Page does not exist", 'utf-8');
    }
}

module.exports = new Handler();
