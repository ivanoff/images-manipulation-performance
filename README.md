# Node.js images manipulation performance

Compare Node.js's modules for images processing request 

v6.3.1

## Preamble

The fastest way to get the results is

`git clone https://github.com/ivanoff/images-manipulation-performance.git`

`cd images-manipulation-performance`

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
canvas1.js;1.802;55.483;94%;569;1.14
canvas2.js;6.660;15.015;94%;578;0.70
easyimage.js;2.269;44.063;94%;580;1.57
gm-imagemagic.js;4.944;20.226;94%;580;1.68
gm.js;5.581;17.919;94%;580;1.48
image-js.js;0.984;101.661;94%;536;1.05
jimp.js;0.716;139.670;94%;514;1.86
sharp-simd.js;10.575;9.456;94%;510;0.97
sharp.js;11.163;8.958;94%;495;0.64
== END ==
```

name            |images/sec|time spent, sec|minCPUidle|minFreeMem, Mb|MaxLoadAvg
----------------|----------|---------------|----------|--------------|----------
canvas1.js | 1.802 | 55.483 | 94% | 569 | 1.14
canvas2.js | 6.660 | 15.015 | 94% | 578 | 0.70
easyimage.js | 2.269 | 44.063 | 94% | 580 | 1.57
gm-imagemagic.js | 4.944 | 20.226 | 94% | 580 | 1.68
gm.js | 5.581 | 17.919 | 94% | 580 | 1.48
image-js.js | 0.984 | 101.661 | 94% | 536 | 1.05
jimp.js | 0.716 | 139.670 | 94% | 514 | 1.86
sharp-simd.js | 10.575 | 9.456 | 94% | 510 | 0.97
sharp.js | **11.163** | 8.958 | 94% | 495 | 0.64


In this example you can see, than [sharp](http://sharp.dimens.io/en/stable/) module is the best, regards to speed of processing of images (~9 images per second on my local computer)

![Images per second](https://raw.githubusercontent.com/ivanoff/images-manipulation-performance/master/static/modules_images.png)


## License

Licensed under [MIT License](LICENSE).


## Created by

Dimitry, 2@ivanoff.org.ua .$ curl -A cv ivanoff.org.ua
