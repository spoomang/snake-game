const assert = require('assert');
const sinon = require('sinon')

const Player = require('../../../client/components/snake');
const Utilities = require('../../../client/utilities/utilities');

const sandbox = sinon.createSandbox();

describe('Player', function () {
  afterEach(() => {
      sandbox.restore();
  })

  describe('updateSnakeLocation', function () {
    let contextStubDrawImage;
    let dummyContext = {
        drawImage: () => {},
    };

    beforeEach(() => {
        contextStubDrawImage = sandbox.stub(dummyContext, 'drawImage');
    });

    it('should call context as expected with links', function () {
        sandbox.stub(Utilities, 'createImage');
        sandbox.stub(Utilities, 'updateLinkLocation');

        const links = [
            {image: '', x: 1, y: 10},
            {image: '', x: 2, y: 20},
            {image: '', x: 3, y: 30},
        ];
        const player = new Player({ ctx: dummyContext });
        player.links = links;

        player.updateSnakeLocation();

        assert.equal(contextStubDrawImage.calledThrice, true);

        for (let i = 0; i < links.length; i++) {
            assert.equal(contextStubDrawImage.calledWithExactly(links[i].image, links[i].x, links[i].y), true);
        }
    });
  });
});
