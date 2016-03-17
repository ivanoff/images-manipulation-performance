# Node.js image processing compare

Compare Node.js's modules for processing request 

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

`git clone https://github.com/ivanoff/image-processing-compare.git`

`cd image-processing-compare`

`npm install`


## Using

`node index.js <source_folder> <result_folder>`

where <source_folder> is foulder where original images are stored, <result_folder> is folder, where result images will be saved.

for example:

`node index.js ../original ../result`

## Result example

```
Found images:
  4198671-green-sea-view.jpg
  Beautiful-Sea-Pier-In-Chile-Hdr-Wide-Desktop-Background-Wallpapers-Beautiful-Sea-Wallpaper-.jpg
  Bluestone-valley-view_-_Virginia_-_ForestWander.jpg
Found modules: canvas.js, gm-imagemagic.js, gm.js, lwip.js
== START ==
canvas.js : done in 7.498536 sec; 4.001 img/sec; minCPUidle: 96%; minFreeMem: 283Mb; MaxLoadAvg: 1.48
gm-imagemagic.js : done in 24.88003 sec; 1.206 img/sec; minCPUidle: 96%; minFreeMem: 456Mb; MaxLoadAvg: 1.59
gm.js : done in 19.528429 sec; 1.536 img/sec; minCPUidle: 96%; minFreeMem: 490Mb; MaxLoadAvg: 1.84
lwip.js : done in 73.891623 sec; 0.406 img/sec; minCPUidle: 96%; minFreeMem: 157Mb; MaxLoadAvg: 1.56
== DONE ==
```

In this example you can see, than [canvas](https://github.com/Automattic/node-canvas) module is the best, regards to speed of processing of images 