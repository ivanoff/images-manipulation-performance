'use strict';

//convert ../original/7360_Nikon-D810-Image-Sample-6.jpg -resize 2000x2000 result/7360_Nikon-D810-Image-Sample-6_2000.jpg
var gm = require('gm').subClass({imageMagick: true});
var calc = require('../lib/calculator');

exports.process = function (fullImagePath, fullImagePathResult, size, callback) {
  var imgParams = [];
  gm(fullImagePath)
    .size(function (err, imageSize) {
      if (!err) {
        imgParams = calc.correctSize(imageSize.width, imageSize.height, size[0], size[1]);
        this
          .resize(imgParams['width'], imgParams['height'])
          .crop(size[0], size[1], imgParams['dx'], 0)
          .write(fullImagePathResult, function (err) {
            if (err) console.log(err);
            callback();
          });
      }
    })
}

