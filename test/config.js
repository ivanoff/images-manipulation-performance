const config = require('../src/config');
const dataDriven = require('data-driven');

describe('Check config', function () {
  it( 'config has modulePath', function (done) {
    config.imageModulesPath.should.be.ok;
    config.imageModulesPath.should.be.type('string');
    done();
  });
  it( 'config has cooldownTimeout', function (done) {
    config.cooldownTimeout.should.be.ok;
    config.cooldownTimeout.should.be.type('number');
    done();
  });
  it( 'config has sizes', function (done) {
    config.sizes.should.be.ok;
    config.sizes.should.be.instanceof(Array);
    done();
  });
  dataDriven( config.sizes, function() {
    it( 'new size {0}x{1} is ok', function (size, done) {
      size.should.be.instanceof(Array).and.have.lengthOf(2);
      size[0].should.be.type('number').and.above(0);
      size[1].should.be.type('number').and.above(0);
      done();
    });
  });
});
