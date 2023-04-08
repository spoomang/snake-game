const assert = require('assert');
const sinon = require('sinon')

const FoodComponent = require('../../../client/components/food');
const Utilities = require('../../../client/utilities/utilities');

const sandbox = sinon.createSandbox();

describe('FoodComponent', function () {
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
        FoodComponent.setParams({
            ctx: dummyContext,
        });
        FoodComponent.food = food;

        FoodComponent.updateFood();

        assert.equal(contextStubDrawImage.calledWithExactly(food.image, food.x, food.y), true);
    });

    it('should call context as expected with food', function () {
        sandbox.stub(Utilities, 'createImage');

        FoodComponent.setParams({
            ctx: dummyContext,
        });

        FoodComponent.updateFood();

        assert.equal(contextStubDrawImage.called, true);
    });
  });
});
