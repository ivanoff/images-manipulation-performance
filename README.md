# Node.js images manipulation performance

Compare Node.js's modules for images processing request 

v6.3.1

## Preamble

The fastest way to get the results is

`docker-compose up`


## Image processing packages list

- canvas v.2.6.0, [source](https://www.npmjs.com/package/canvas)
- canvas v.1.6.13, [source](https://github.com/Automattic/node-canvas/releases/tag/v1.6.13)
- easyimage v.3.1.1, [source](https://www.npmjs.com/package/easyimage)
- gm v.1.23.1, [source](https://www.npmjs.com/package/gm)
- image-js v.0.21.7, [source](https://www.npmjs.com/package/image-js)
- imagemagick v.0.1.3, [source](https://www.npmjs.com/package/imagemagick)
- jimp v.0.6.8, [source](https://www.npmjs.com/package/jimp)
- sharp v.0.23.0, [source](https://www.npmjs.com/package/sharp)

### Deprecated packages

- lwip v.0.0.9, [source](https://www.npmjs.com/package/lwip)


## Dependencies

- Node.js v.8.0 or higher

- node-canvas module (see [Modules instalation](#modules_instalation) section)

- gm (see [Modules instalation](#modules_instalation) section)


## Modules instalation

### node-canvas

Please, read extra instructions how to install node-canvas module [here](https://github.com/Automattic/node-canvas).

For example, you can quickly install the dependencies by using the command for your OS:

OS | Command
----- | -----
OS X | `brew install pkg-config cairo pango libpng jpeg giflib librsvg`
Ubuntu | `sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev`
Fedora | `sudo yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel`
Solaris | `pkgin install cairo pango pkg-config xproto renderproto kbproto xextproto`
OpenBSD | `doas pkg_add cairo pango png jpeg giflib`
Windows | See the [wiki](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows)
Others | See the [wiki](https://github.com/Automattic/node-canvas/wiki)

### gm

OS | Command
----- | -----
OS X | `brew install imagemagick graphicsmagick`
Ubuntu | `sudo apt-get install imagemagick graphicsmagick`
Fedora | `sudo yum install imagemagick graphicsmagick`
Solaris | `pkgin install imagemagick graphicsmagick`
Windows | [Instructions on graphicsmagick](http://www.graphicsmagick.org/INSTALL-windows.html)


## Installing

*Please read `Modules instalation` section before.*

`git clone https://github.com/ivanoff/images-manipulation-performance.git`

`cd images-manipulation-performance`

`npm install`


## Testing

`npm test`


## Using

`IN=<source_folder> OUT=<result_folder> node src/index.js`

where <source_folder> is foulder where original images are stored, <result_folder> is folder, where result images will be saved.

for example:

`IN=static/original OUT=static/result node src/index.js`


## Result example

```
Images found: 10
Modules found: 8
List of modules: canvas.js, easyimage.js, gm-imagemagic.js, gm.js, image-js.js, jimp.js, sharp-simd.js, sharp.js
Time for cooling down before each modulle, sec: 60
== START ==
name;images/sec;time spent, sec;minCPUidle;minFreeMem, Mb;MaxLoadAvg
canvas.js;1.696;58.955;97%;41;0.98
easyimage.js;1.788;55.932;97%;46;1.02
gm-imagemagic.js;3.898;25.657;97%;55;0.81
gm.js;4.339;23.048;97%;52;0.97
image-js.js;0.680;147.098;97%;10;1.42
jimp.js;0.503;198.705;97%;16;1.50
sharp-simd.js;8.410;11.890;97%;7;0.72
sharp.js;9.495;10.532;97%;36;0.46
== END ==
```

name            |images/sec|time spent, sec|minCPUidle|minFreeMem, Mb|MaxLoadAvg
----------------|----------|---------------|----------|--------------|----------
canvas.js       |1.696    |58.955  |97%|41 |0.98
easyimage.js    |1.788    |55.932  |97%|46 |1.02
gm-imagemagic.js|3.898    |25.657  |97%|55 |0.81
gm.js           |4.339    |23.048  |97%|52 |0.97
image-js.js     |0.680    |147.098 |97%|10 |1.42
jimp.js         |0.503    |198.705 |97%|16 |1.50
sharp-simd.js   |8.410    |11.890  |97%|7  |0.72
sharp.js        |**9.495**|10.532|  97%|36 |**0.46**


In this example you can see, than [sharp](http://sharp.dimens.io/en/stable/) module is the best, regards to speed of processing of images (~9 images per second on my local computer)

![Images per second](https://raw.githubusercontent.com/ivanoff/images-manipulation-performance/master/static/modules_images.png)


## License

Licensed under [MIT License](LICENSE).


## Created by

Dimitry, 2@ivanoff.org.ua .$ curl -A cv ivanoff.org.ua
