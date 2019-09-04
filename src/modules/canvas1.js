const fs = require('fs');
const calc = require('../lib/calculator');

const Canvas = require('canvas');
const Image = Canvas.Image;

module.exports.process = async ({from, to, size}) =>
  new Promise((resolve, reject) => {
    fs.readFile(from, (err, squid) => {
      if(err) return reject(err);

      const img = new Image;
      img.src = squid;

      const {dx, width, height} = calc.correctSize(img.width, img.height, ...size);

      const canvas = new Canvas(...size);
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;

      ctx.drawImage(img, -dx, 0, width, height);

      fs.createWriteStream(to)
      const stream = canvas.jpegStream({ quality: 90 });
      
      let bufs = [];
      stream.on('data', chunk => bufs.push( chunk ));

      stream.on('end', () => {
        fs.writeFile(to, bufs, (err) => err? reject(err) : resolve());
      });

    });
});
