'use strict';

var fs = require('fs');
var Canvas = require('canvas');
var Image = Canvas.Image;
var calc = require('../lib/calculator');

exports.process = function (fullImagePath, fullImagePathResult, size, callback) {
  fs.readFile( fullImagePath, function(err, squid){
    if (err) callback(err);
    var img = new Image;
    img.src = squid;

    var imgParams = calc.correctSize(img.width, img.height, size[0], size[1]);

    var canvas = new Canvas(size[0], size[1]);
    var ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;

    ctx.drawImage(img, -imgParams['dx'], 0, imgParams['width'], imgParams['height']);

    var out = fs.createWriteStream( fullImagePathResult )
    var stream = canvas.jpegStream({
       quality: 90, // JPEG quality (0-100) default: 75
//      bufsize: 4096, // output buffer size in bytes, default: 4096
//      progressive: false, // true for progressive compression, default: false
    });

    stream.on('data', function(chunk){
      out.write(chunk);
    });

    stream.on('end', callback);

  });
}

