'use strict';

var sharp = require('sharp');
var calc = require('../lib/calculator');

exports.process = function (fullImagePath, fullImagePathResult, size, callback) {
  var image = sharp(fullImagePath)
  image
    .metadata(function(metadata) {
      var imgParams = calc.correctSize(image.width, image.height, size[0], size[1]);
      return image
        .resize(size[0], size[1])
        //sharp has good .crop method, but there are gravity an strategy parameters only
        .extract({ left: imgParams['dx'], top: 0, width: size[0], height: size[1] })
        .toFile(fullImagePathResult, function(err) {
          callback();
        });
    })
}
