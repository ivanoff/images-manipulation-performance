'use strict';

var calc = require('../lib/calculator');
var dataDriven = require('data-driven');

describe('Calculator testing', function () {
  describe('No resize', function () {
    dataDriven([
      { x: 50,  y: 50,  xN: 50,  yN: 50,  result: { width: 50,  height: 50,  dx: 0 } },
      { x: 100, y: 50,  xN: 100, yN: 50,  result: { width: 100, height: 50,  dx: 0 } },
      { x: 50,  y: 100, xN: 50,  yN: 100, result: { width: 50,  height: 100, dx: 0 } },
      { x: 100, y: 100, xN: 100, yN: 100, result: { width: 100, height: 100, dx: 0 } },
    ], function() {
      it( '{x}x{y} to {xN}x{yN}', function (p, done) {
        var params = calc.correctSize(p.x, p.y, p.xN, p.yN);
        params.should.eql(p.result);
        done();
      });
    });
  });

  describe('Resize', function () {
    dataDriven([
      { x: 100, y: 50,  xN: 50, yN: 50, result: { width: 100, height: 50,  dx: 25 } },
      { x: 50,  y: 100, xN: 50, yN: 50, result: { width: 50,  height: 100, dx: 0  } },
      { x: 100, y: 100, xN: 50, yN: 50, result: { width: 50,  height: 50,  dx: 0  } },
      { x: 75,  y: 58,  xN: 99, yN: 99, result: { width: 128, height: 99,  dx: 15 } },
    ], function(a) {
      it( '{x}x{y} to {xN}x{yN}', function (p, done) {
        var params = calc.correctSize(p.x, p.y, p.xN, p.yN);
        params.should.eql(p.result);
        done();
      });
    });
  });
});
