'use strict';

var lwip = require('lwip');
var calc = require('../lib/calculator');

exports.process = function (fullImagePath, fullImagePathResult, size, callback) {
  var imgParams = [];
  lwip.open(fullImagePath, function(err, image){
    var imgParams = calc.correctSize(image.width(), image.height(), size[0], size[1]);
    image.batch()
    .resize(imgParams['width'],imgParams['height'])
    .crop(-imgParams['dx'], 0, size[0], size[1])
    .writeFile(fullImagePathResult, function(err){
      callback();
    });
  })
}

