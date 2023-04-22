const regexJSUrl = /.*\.js$/;
const regexPNGUrl = /.*\.png$/;
const regexJPEGUrl = /.*\.jpg$/;
const regexCSSUrl = /.*\.css$/;

const isJsUrl = url => regexJSUrl.test(url);
const isPNGUrl = url => regexPNGUrl.test(url);
const isJPEGUrl = url => regexJPEGUrl.test(url);
const isCSSUrl = url => regexCSSUrl.test(url);
const isCodeResource  = function(url) {
    return this.isJsUrl(url) || this.isPNGUrl(url)
    || this.isJPEGUrl(url) || this.isCSSUrl(url);
};


module.exports = {
    isJsUrl,
    isPNGUrl,
    isJPEGUrl,
    isCSSUrl,
    isCodeResource,
};
