const calc = require('../lib/calculator');
const { info, resize, crop } = require('easyimage');

module.exports.process = ({from, to, size}) =>
  new Promise(async resolve => {
    const image = await info(from);
    const {dx, width, height} = calc.correctSize(image.width, image.height, ...size);
    await resize({src: from, dst: to, width, height})
    await crop({ src: to, dst: to, x: dx, y: 0, cropWidth: size[0], cropHeight: size[1] });
    resolve();
  })
