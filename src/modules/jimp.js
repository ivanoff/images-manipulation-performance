const calc = require('../lib/calculator');
const Jimp = require("jimp");

module.exports.process = async ({from, to, size}) =>
  new Promise((resolve, reject) => {

    Jimp.read(from, function (err, image) {
      if (err) return reject(err);

      const {dx, width, height} = calc.correctSize(image.bitmap.width, image.bitmap.height, ...size);

      image.resize(width, height)
        .crop(dx, 0, ...size)
        .write(to, err => err ? reject(err) : resolve());
    });
})
