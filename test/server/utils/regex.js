const assert = require('assert');
const Regex = require('../../../server/utils/regex');

describe('Regex', () => {
    describe('isJsUrl', () => {
        it('should return expected', () => {
            const testCases = [
                {url: 'js', expected: false},
                {url: '.js', expected: true},
                {url: '/das/das.js', expected: true},
                {url: '/das.js', expected: true},
                {url: 'as.js', expected: true},
                {url: 'as.js/', expected: false},
                {url: 'as.jsx', expected: false},
                {url: '/as.js/ab', expected: false},
            ];

            testCases.forEach(test => {
                const actual = Regex.isJsUrl(test.url);
                assert.equal(actual, test.expected);
            });
        });
    });

    describe('isPNGUrl', () => {
        it('should return expected', () => {
            const testCases = [
                {url: 'png', expected: false},
                {url: '.png', expected: true},
                {url: '/das/das.png', expected: true},
                {url: '/das.png', expected: true},
                {url: 'as.png', expected: true},
                {url: 'as.png/', expected: false},
                {url: 'as.pngx', expected: false},
                {url: '/as.png/ab', expected: false},
            ];

            testCases.forEach(test => {
                const actual = Regex.isPNGUrl(test.url);
                assert.equal(actual, test.expected);
            });
        });
    });

    describe('isJPEGUrl', () => {
        it('should return expected', () => {
            const testCases = [
                {url: 'jpg', expected: false},
                {url: '.jpg', expected: true},
                {url: '/das/das.jpg', expected: true},
                {url: '/das.jpg', expected: true},
                {url: 'as.jpg', expected: true},
                {url: 'as.jpg/', expected: false},
                {url: 'as.jpgs', expected: false},
                {url: '/as.jpg/ab', expected: false},
            ];

            testCases.forEach(test => {
                const actual = Regex.isJPEGUrl(test.url);
                assert.equal(actual, test.expected);
            });
        });
    });

    describe('isCSSUrl', () => {
        it('should return expected', () => {
            const testCases = [
                {url: 'css', expected: false},
                {url: '.css', expected: true},
                {url: '/das/das.css', expected: true},
                {url: '/das.css', expected: true},
                {url: 'as.css', expected: true},
                {url: 'as.css/', expected: false},
                {url: 'as.csse', expected: false},
                {url: '/as.css/ab', expected: false},
            ];

            testCases.forEach(test => {
                const actual = Regex.isCSSUrl(test.url);
                assert.equal(actual, test.expected);
            });
        });
    });

    describe('isCodeResource', () => {
        it('should return expected', () => {
            const testCases = [
                {url: 'css', expected: false},
                {url: '.css', expected: true},
                {url: '/das/das.css', expected: true},
                {url: '/das.css', expected: true},
                {url: 'as.css', expected: true},
                {url: 'as.css/', expected: false},
                {url: 'as.csse', expected: false},
                {url: '/as.css/ab', expected: false},

                {url: 'jpg', expected: false},
                {url: '.jpg', expected: true},
                {url: '/das/das.jpg', expected: true},
                {url: '/das.jpg', expected: true},
                {url: 'as.jpg', expected: true},
                {url: 'as.jpg/', expected: false},
                {url: 'as.jpgs', expected: false},
                {url: '/as.jpg/ab', expected: false},

                {url: 'js', expected: false},
                {url: '.js', expected: true},
                {url: '/das/das.js', expected: true},
                {url: '/das.js', expected: true},
                {url: 'as.js', expected: true},
                {url: 'as.js/', expected: false},
                {url: 'as.jsx', expected: false},
                {url: '/as.js/ab', expected: false},
 
                {url: 'png', expected: false},
                {url: '.png', expected: true},
                {url: '/das/das.png', expected: true},
                {url: '/das.png', expected: true},
                {url: 'as.png', expected: true},
                {url: 'as.png/', expected: false},
                {url: 'as.pngx', expected: false},
                {url: '/as.png/ab', expected: false},

            ];

            testCases.forEach(test => {
                const actual = Regex.isCodeResource(test.url);
                assert.equal(actual, test.expected);
            });
        });
    });
});