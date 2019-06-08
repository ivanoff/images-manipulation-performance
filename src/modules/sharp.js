const sharp = require('sharp');

module.exports.process = async ({from, to, size}) =>
  new Promise((resolve, reject) => {

    // Disable experimental SIMD support - this is the default behaviour
    sharp.simd(false);

    sharp(from)
      .resize(...size)
      .toFile(to, err => err ? reject(err) : resolve());

  })
