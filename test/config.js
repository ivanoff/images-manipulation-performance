'use strict';
var config = require('config');
var dataDriven = require('data-driven');

describe('Check config', function () {
  it( 'config has modulePath', function (done) {
    config.has('modulesPath').should.be.ok;
    config.get('modulesPath').should.be.type('string');
    done();
  });
  it( 'config has cooldownTimeout', function (done) {
    config.has('cooldownTimeout').should.be.ok;
    config.get('cooldownTimeout').should.be.type('number');
    done();
  });
  it( 'config has sizes', function (done) {
    config.has('sizes').should.be.ok;
    config.get('sizes').should.be.instanceof(Array);
    done();
  });
  dataDriven( config.get('sizes'), function() {
    it( 'new size {0}x{1} is ok', function (size, done) {
      size.should.be.instanceof(Array).and.have.lengthOf(2);
      size[0].should.be.type('number').and.above(0);
      size[1].should.be.type('number').and.above(0);
      done();
    });
  });
});
