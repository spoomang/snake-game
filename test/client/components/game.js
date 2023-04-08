const assert = require('assert');
const sinon = require('sinon')
const Game = require('../../../client/components/game');

describe('Game', function () {
  afterEach(() => {
  })

  describe('updateFood', function () {
    let contextStubDrawImage;
    let dummyContext = {
        drawImage: () => {},
    };

    beforeEach(() => {
        contextStubDrawImage = sinon.stub(dummyContext, 'drawImage');
    });

    it('should call context as expected', function () {
        const food ={
            image: 'abc',
            x: 1,
            y: 10,
        }
        const game = new Game(null, dummyContext, '');
        game.food = food;

        game.updateFood();

        assert.equal(contextStubDrawImage.calledWithExactly(food.image, food.x, food.y), true);
    });
  });
});
