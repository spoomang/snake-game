const assert = require('assert');
const { getContentType, getFilePath, getUrlToComponents } = require('../../../server/utils/utils');

describe('Utils', () => {
  describe('getContentType', () => {
    it('should return expected content type', () => {
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

  describe('getFilePath',  () => {
    it('should return expected file path', () => {
      const url = '/index';
      const expected = './index';

      const actual = getFilePath(url);

      assert.equal(actual, expected);
    });  
  })

  describe('getUrlToComponents',  () => {
    it('should return expected urls and params', () => {
      const url = '/abc/direction?key1=value1&key2=value2&key3=';

      const expected = {
        path: '/abc/direction',
        paramsMap: {
          key1 : 'value1',
          key2 : 'value2',
          key3 : '',
        },
      }

      const actual = getUrlToComponents(url);

      assert.deepEqual(actual, expected);
    });

    it('should return expected url when no param', () => {
      const urls = [
        '/abc/direction?',
        '/abc/direction',
        '/abc/direction?abc',
        '/abc/direction?abc/def',
      ];

      const expected = {
        path: '/abc/direction',
        paramsMap: {},
      }

      urls.forEach(url => {
        const actual = getUrlToComponents(url);

        assert.deepEqual(actual, expected);
      })
    }); 
  }); 
});
