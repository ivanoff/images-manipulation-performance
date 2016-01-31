'use strict';

var im = require('imagemagick');
var calc = require('../lib/calculator');

exports.process = function (fullImagePath, fullImagePathResult, size, callback) {
  im.identify(fullImagePath, function(err, imageSize){
  // identify -verbose ../original/7360_Nikon-D810-Image-Sample-6.jpg
    if (err) throw err;
    var imgParams = calc.correctSize(imageSize.width, imageSize.height, size[0], size[1]);
    im.resize({
    // convert ../original/482002141.jpg -set option:filter:blur 0.8 -filter Lagrange -strip -resize 375x250 -quality 80 result/482002141_250.jpg
      srcPath: fullImagePath,
      dstPath: fullImagePathResult,
      width: imgParams['width'],
      height: imgParams['height'],
    }, function(){
      im.crop({
        srcPath: fullImagePathResult,
        dstPath: fullImagePathResult,
        width: size[0],
        height: size[1],
        gravity: "North",
      }, function(){
        callback();
      })
    });
  });
}

