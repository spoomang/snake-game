function Handler() {
    this.handlerMap = new Map();
}

Handler.prototype.add = function(path, handler) {
    this.handlerMap[path] = handler;
}

Handler.prototype.handle = function(path, request, response) {
    console.log("", this.handlerMap);

    if (this.handlerMap.has(path)) {
        this.handlerMap[path](request, response);
    } else {
        console.log('no path exist..');
        response.writeHead(404, { 'Content-Type': "contentType" });
        response.end("Page does not exist", 'utf-8');
    }
}

module.exports = new Handler();
