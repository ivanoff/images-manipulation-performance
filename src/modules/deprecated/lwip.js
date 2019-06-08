const calc = require('../lib/calculator');
const lwip = require('lwip');

module.exports.process = async ({from, to, size}) =>
  new Promise((resolve, reject) => {
    lwip.open(from, function(err, image){
      if (err) return reject(err);

      const {dx, width, height} =  calc.correctSize(image.width(), image.height(), ...size);
      image.batch()
      .resize(width,height)
      .crop(dx, 0, ...size)
      .writeFile(to, err => err ? reject(err) : resolve());
    })
})
