const sharp = require('sharp');

module.exports.process = async ({from, to, size}) =>
  new Promise((resolve, reject) => {
    // Enable experimental SIMD support
    sharp.simd(true);

    sharp(from)
      .resize(...size)
      .toFile(to, err => err ? reject(err) : resolve());
})
