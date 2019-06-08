const calc = require('../lib/calculator');
const im = require('imagemagick');

module.exports.process = async ({from, to, size}) =>
  new Promise((resolve, reject) => {
    im.identify(from, function(err, imageSize){
      if(err) return reject(err);

      const {width, height} = calc.correctSize(imageSize.width, imageSize.height, ...size);
      im.resize({
        srcPath: from,
        dstPath: to,
        width: width,
        height: height,
      }, err => {
        if(err) return reject(err);

        im.crop({
          srcPath: to,
          dstPath: to,
          width: size[0],
          height: size[1],
          gravity: "North",
        }, err => err ? reject(err) : resolve())
      });
    });
})
