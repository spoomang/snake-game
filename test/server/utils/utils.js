const assert = require('assert');
const { getContentType, getFilePath } = require('../../../server/utils/utils');

describe('Utils', function () {
  describe('getContentType', function () {
    it('should return expected content type', function () {
      const testCases = [
        { filepath: 'index.html', expected: 'text/html' },
        { filepath: 'index.js', expected: 'text/javascript' },
        { filepath: 'index.css', expected: 'text/css' },
        { filepath: 'index.json', expected: 'application/json' },
        { filepath: 'index.png', expected: 'image/png' },
        { filepath: 'index.jpg', expected: 'image/jpg' },
        { filepath: 'index.wav', expected: 'audio/wav' },
      ];

      testCases.forEach(test => {
        const actual = getContentType(test.filepath);
  
        assert.equal(actual, test.expected);
      });
    });
  });

  describe('getFilePath', function () {
    it('should return expected file path', function () {
      const url = '/index';
      const expected = './index';

      const actual = getFilePath(url);

      assert.equal(actual, expected);
    });  
  });
});
