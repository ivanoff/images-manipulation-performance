'use strict';

var sharp = require('sharp');

exports.process = function (fullImagePath, fullImagePathResult, size, callback) {
  // Enable experimental SIMD support
  sharp.simd(true);

  sharp(fullImagePath)
    .resize(size[0], size[1])
    .toFile(fullImagePathResult, callback);
}
