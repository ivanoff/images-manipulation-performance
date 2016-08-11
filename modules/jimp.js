'use strict';

var Jimp = require("jimp");
var calc = require('../lib/calculator');

exports.process = function (fullImagePath, fullImagePathResult, size, callback) {

  Jimp.read(fullImagePath, function (err, image) {
    if (err) throw err;

    var imgParams = calc.correctSize(image.bitmap.width, image.bitmap.height, size[0], size[1]);

    image.resize(imgParams['width'], imgParams['height'])
      .crop(imgParams['dx'], 0, size[0], size[1])
      .write(fullImagePathResult, function (err) {
        if (err) console.log(err);
          callback();
        });
  });
}

/*
//gm convert ../original/7360_Nikon-D810-Image-Sample-6.jpg -resize 2000x2000 result/7360_Nikon-D810-Image-Sample-6_2000.jpg
var gm = require('gm');
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
      } else {
        callback( err );
      }
    })
}
*/