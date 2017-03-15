# Node.js images manipulation performance

Compare Node.js's modules for images processing request 

v1.2.3

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
sharp.js : 9.501 img/sec; done in 10.525585 sec; minCPUidle: 95%; minFreeMem: 929Mb; MaxLoadAvg: 0.68
canvas.js : 8.246 img/sec; done in 12.12766 sec; minCPUidle: 95%; minFreeMem: 578Mb; MaxLoadAvg: 0.88
gm.js : 4.433 img/sec; done in 22.557112 sec; minCPUidle: 95%; minFreeMem: 791Mb; MaxLoadAvg: 1.18
gm-imagemagic.js : 3.654 img/sec; done in 27.367915 sec; minCPUidle: 95%; minFreeMem: 804Mb; MaxLoadAvg: 1.33
lwip.js : 1.203 img/sec; done in 83.126963 sec; minCPUidle: 95%; minFreeMem: 54Mb; MaxLoadAvg: 1.21
jimp.js : 0.445 img/sec; done in 224.879934 sec; minCPUidle: 95%; minFreeMem: 82Mb; MaxLoadAvg: 1.28
== DONE ==
```

In this example you can see, than [sharp](http://sharp.dimens.io/en/stable/) module is the best, regards to speed of processing of images (~9 imgages per second on my local computer)

![Images per second](https://raw.githubusercontent.com/ivanoff/images-manipulation-performance/master/static/modules_images.png)


## License

Licensed under [MIT License](LICENSE).


## Created by

Dimitry, 2@ivanoff.org.ua .$ curl -A cv ivanoff.org.ua
