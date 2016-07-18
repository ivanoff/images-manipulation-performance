# Node.js images manipulation performance

Compare Node.js's modules for images processing request 

## Modules instalation

### node-canvas

Please, read extra instructions how to install node-canvas module [here](https://github.com/Automattic/node-canvas).

For example, you can quickly install the dependencies by using the command for your OS:

OS | Command
----- | -----
OS X | `brew install pkg-config cairo libpng jpeg giflib`
Ubuntu | `sudo apt-get install libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev build-essential g++`
Fedora | `sudo yum install cairo cairo-devel cairomm-devel libjpeg-turbo-devel pango pango-devel pangomm pangomm-devel giflib-devel`
Solaris | `pkgin install cairo pkg-config xproto renderproto kbproto xextproto`
Windows | [Instructions on our wiki](https://github.com/Automattic/node-canvas/wiki/Installation---Windows)

### gm

`sudo apt-get install imagemagick`

`sudo apt-get install graphicsmagick`


## Installing

*Please read `Modules instalation` section before.*

`git clone https://github.com/ivanoff/images-manipulation-performance.git`

`cd images-manipulation-performance`

`npm install`


## Testing

`npm test`


## Using

`node index.js <source_folder> <result_folder>`

where <source_folder> is foulder where original images are stored, <result_folder> is folder, where result images will be saved.

for example:

`node index.js static/original static/result`

## Result example

```
Found images:
  4198671-green-sea-view.jpg
  Beautiful-Sea-Pier-In-Chile-Hdr-Wide-Desktop-Background-Wallpapers-Beautiful-Sea-Wallpaper-.jpg
  Bluestone-valley-view_-_Virginia_-_ForestWander.jpg
Found modules: canvas.js, gm-imagemagic.js, gm.js, lwip.js
== START ==
sharp.js : 8.451 img/sec; done in 11.832713 sec; minCPUidle: 92%; minFreeMem: 533Mb; MaxLoadAvg: 0.49
canvas.js : 5.561 img/sec; done in 17.983573 sec; minCPUidle: 92%; minFreeMem: 492Mb; MaxLoadAvg: 0.34
gm.js : 2.359 img/sec; done in 42.397843 sec; minCPUidle: 92%; minFreeMem: 459Mb; MaxLoadAvg: 1.4
gm-imagemagic.js : 1.633 img/sec; done in 61.248407 sec; minCPUidle: 92%; minFreeMem: 464Mb; MaxLoadAvg: 1.41
lwip.js : 0.821 img/sec; done in 121.843491 sec; minCPUidle: 92%; minFreeMem: 142Mb; MaxLoadAvg: 1.02
== DONE ==
```

In this example you can see, than [sharp](http://sharp.dimens.io/en/stable/) module is the best, regards to speed of processing of images (~8 imgages per second on my local computer)

[[https://github.com/ivanoff/images-manipulation-performance/blob/master/static/modules_images.png|alt=images_per_second]]


## License

Licensed under [MIT License](LICENSE).


## Created by

Dimitry, 2@ivanoff.org.ua .$ curl -A cv ivanoff.org.ua
