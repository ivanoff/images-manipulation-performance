const calc = require('../lib/calculator');
const gm = require('gm').subClass({imageMagick: true});

module.exports.process = async ({from, to, size}) =>
  new Promise((resolve, reject) => {
    gm(from)
      .size(function (err, imageSize) {
        if(err) return reject(err);

        const {dx, width, height} = calc.correctSize(imageSize.width, imageSize.height, ...size);
        this
          .resize(width, height)
          .crop(...size, dx, 0)
          .write(to, err => err ? reject(err) : resolve());
      })
  })

