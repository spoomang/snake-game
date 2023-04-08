const assert = require('assert');
const sinon = require('sinon')

const Game = require('../../../client/components/game');
const Utilities = require('../../../client/utilities/utilities');

const sandbox = sinon.createSandbox();

describe('Game', function () {
  afterEach(() => {
      sandbox.restore();
  })

  describe('updateFood', function () {
    let contextStubDrawImage;
    let dummyContext = {
        drawImage: () => {},
    };

    beforeEach(() => {
        contextStubDrawImage = sandbox.stub(dummyContext, 'drawImage');
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

    it('should call context as expected with food', function () {
        sandbox.stub(Utilities, 'createImage');

        const game = new Game(null, dummyContext, '');

        game.updateFood();

        assert.equal(contextStubDrawImage.called, true);
    });
  });
});
