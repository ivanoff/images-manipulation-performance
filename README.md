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


