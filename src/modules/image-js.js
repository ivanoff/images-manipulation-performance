const calc = require('../lib/calculator');
const { Image } = require('image-js');

module.exports.process = async ({from, to, size}) => {
  let image = await Image.load(from);

  const {dx, width, height} = calc.correctSize(image.width, image.height, ...size);
  let result = image
    .resize({width, height})
    .crop({x: dx, y: 0, width: size[0], height: size[1]})

   return result.save(to);
}
