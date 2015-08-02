suite('loading images', function () {
  var myp5 = new p5(function () {
  }, true);
  var imagePath = 'unit/assets/nyan_cat.gif';

  setup(function disableFileLoadError() {
    sinon.stub(p5, '_friendlyFileLoadError');
  });

  teardown(function restoreFileLoadError() {
    p5._friendlyFileLoadError.restore();
  });

  test('should call successCallback when image loads', function (done) {
    myp5.loadImage(
      imagePath,
      function (pImg) {
        assert.ok('nyan_cat.gif loaded');
        done();
      },
      function (event) {
        assert.fail();
        done();
      });
  });

  test('should call successCallback when image loads', function (done) {
    myp5.loadImage(
      imagePath,
      function (pImg) {
        assert.isTrue(pImg instanceof p5.Image);
        done();
      },
      function (event) {
        assert.fail();
        done();
      });
  });

  test('should call failureCallback when unable to load image', function (done) {
    myp5.loadImage(
      'invalid path',
      function (pImg) {
        assert.fail();
        done();
      },
      function (event) {
        assert.equal(event.type, 'error');
        assert.isTrue(p5._friendlyFileLoadError.called);
        done();
      });
  });
});
