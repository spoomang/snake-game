const assert = require('assert');
const { LINK_HEIGHT, LINK_WIDTH, CANVAS_WIDTH, CANVAS_HEIGHT, BORDER_MARGIN } = require('../../../client/enums/length');
const { DIRECTION_RIGHT, DIRECTION_LEFT, DIRECTION_UP, DIRECTION_DOWN } = require('../../../client/enums/direction');

const Utilities = require('../../../client/utilities/utilities');

describe('Utilities', () => {
  describe('ateFood', () => {
    it('should return true if coordinates overlap', () => {
        const x1 = 10 ;
        const y1 = 12;
        const x2 = 11;
        const y2 = 14;

        const actual = Utilities.ateFood(x1, y1, x2, y2);

        assert.equal(actual, true);
    });

    it('should return false x overlaps, y does not', () => {
        const x1 = LINK_WIDTH;
        const y1 = LINK_HEIGHT + 1;
        const x2 = 2 * LINK_WIDTH + 1;
        const y2 = LINK_HEIGHT + 1;

        const actual = Utilities.ateFood(x1, y1, x2, y2);

        assert.equal(actual, false);
    });

    it('should return false x does not, y overlaps', () => {
        const x1 = LINK_WIDTH;
        const y1 = LINK_HEIGHT;
        const x2 = 2 * LINK_WIDTH;
        const y2 = 2 * LINK_WIDTH + 1;

        const actual = Utilities.ateFood(x1, y1, x2, y2);

        assert.equal(actual, false);
    });

    it('should return false x, y does not', () => {
        const x1 = LINK_WIDTH;
        const y1 = LINK_HEIGHT;
        const x2 = 2 * LINK_WIDTH + 1;
        const y2 = 2 * LINK_HEIGHT + 1;

        const actual = Utilities.ateFood(x1, y1, x2, y2);

        assert.equal(actual, false);
    });
  });

  describe('getXYCordinateOfFood', () => {
    it('x, y should within canvas limits', () => {
      for (let i = 0; i < 100; i++) {
         const [x, y] = Utilities.getXYCordinateOfFood();
          console.log('dasdas', x, y);
         assert.equal(x < CANVAS_WIDTH, true);
         assert.equal(y < CANVAS_HEIGHT, true);
      }
    });
  });

  describe('updateLinkLocation', () => {
    it('right direction', () => {
        const initialPosition = 10;
        const link = {
            x: initialPosition,
            direction: DIRECTION_RIGHT,
        }

        Utilities.updateLinkLocation(link);

        const expected = initialPosition + LINK_WIDTH;

        assert.equal(link.x, expected);
    });

    it('right direction, out of bound from canvas', () => {
        const initialPosition = CANVAS_WIDTH + 10;
        const link = {
            x: initialPosition,
            direction: DIRECTION_RIGHT,
        }

        Utilities.updateLinkLocation(link);

        const expected = BORDER_MARGIN;

        assert.equal(link.x, expected);
    });

    it('left direction', () => {
        const initialPosition = 900;
        const link = {
            x: initialPosition,
            direction: DIRECTION_LEFT,
        }

        Utilities.updateLinkLocation(link);

        const expected = initialPosition - LINK_WIDTH;

        assert.equal(link.x, expected);
    });

    it('left direction, out of bounds from canvas', () => {
        const initialPosition = -1;
        const link = {
            x: initialPosition,
            direction: DIRECTION_LEFT,
        }

        Utilities.updateLinkLocation(link);

        const expected = CANVAS_WIDTH - (LINK_WIDTH + BORDER_MARGIN);

        assert.equal(link.x, expected);
    });

    it('down direction', () => {
        const initialPosition = 10;
        const link = {
            y: initialPosition,
            direction: DIRECTION_DOWN,
        }

        Utilities.updateLinkLocation(link);

        const expected = initialPosition + LINK_HEIGHT;

        assert.equal(link.y, expected);
    });

    it('down direction, out of bounds', () => {
        const initialPosition = CANVAS_HEIGHT + 10;
        const link = {
            y: initialPosition,
            direction: DIRECTION_DOWN,
        }

        Utilities.updateLinkLocation(link);

        const expected = BORDER_MARGIN;

        assert.equal(link.y, expected);
    });

    it('up direction', () => {
        const initialPosition = 100;
        const link = {
            y: initialPosition,
            direction: DIRECTION_UP,
        }

        Utilities.updateLinkLocation(link);

        const expected = initialPosition - LINK_HEIGHT;

        assert.equal(link.y, expected);
    });

    it('up direction, out of bounds', () => {
        const initialPosition = 10;
        const link = {
            y: initialPosition,
            direction: DIRECTION_UP,
        }

        Utilities.updateLinkLocation(link);

        const expected = CANVAS_HEIGHT - (LINK_HEIGHT + BORDER_MARGIN) ;

        assert.equal(link.y, expected);
    });
  });
});
