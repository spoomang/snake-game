const assert = require('assert');
const { LINK_HEIGHT, LINK_WIDTH } = require('../../../client/enums/length');

const Utilities = require('../../../client/utilities/utilities');

describe('Utilities', function () {
  describe('ateFood', function () {
    it('should return true if coordinates overlap', function () {
        const x1 = 10 ;
        const y1 = 12;
        const x2 = 11;
        const y2 = 14;

        const actual = Utilities.ateFood(x1, y1, x2, y2);

        assert.equal(actual, true);
    });

    it('should return false x overlaps, y does not', function () {
        const x1 = LINK_WIDTH;
        const y1 = LINK_HEIGHT + 1;
        const x2 = 2 * LINK_WIDTH + 1;
        const y2 = LINK_HEIGHT + 1;

        const actual = Utilities.ateFood(x1, y1, x2, y2);

        assert.equal(actual, false);
    });

    it('should return false x does not, y overlaps', function () {
        const x1 = LINK_WIDTH;
        const y1 = LINK_HEIGHT;
        const x2 = 2 * LINK_WIDTH;
        const y2 = 2 * LINK_WIDTH + 1;

        const actual = Utilities.ateFood(x1, y1, x2, y2);

        assert.equal(actual, false);
    });

    it('should return false x, y does not', function () {
        const x1 = LINK_WIDTH;
        const y1 = LINK_HEIGHT;
        const x2 = 2 * LINK_WIDTH + 1;
        const y2 = 2 * LINK_HEIGHT + 1;

        const actual = Utilities.ateFood(x1, y1, x2, y2);

        assert.equal(actual, false);
    });
  });
});
