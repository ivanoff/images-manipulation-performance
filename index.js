//'use strict';

if (process.argv.length <= 3) {
  console.log("Usage: " + __filename + " <path/to/original> <path/to/result>");
  process.exit(-1);
}

var fs = require('fs');
var async = require('async');
var sleep = require('sleep');
var os = require("os");
var cpus = os.cpus();

var options = {
  cooldownTimeout: 2,   // time out to cooldown, sec
  modulesPath: './modules/', // path to resize modules
  sizes: [              // new sizes to resize
    [50, 50],
    [100, 100],
    [250, 250],
    [400, 300],
    [750, 750],
    [800, 600],
    [900, 900],
    [1000, 500],
    [1200, 1200],
    [2000, 2000],
  ],
};

// Prepare list of images
var pathSource = process.argv[2] + '/';
var pathResult = process.argv[3] + '/';

var imagesList = fs.readdirSync(pathSource);
console.log( 'Found images: \n\t', imagesList.join('\n\t') );

var images = imagesList.map( function(image){
  return { from: pathSource + image, to: pathResult + image };
});

// Requiring modules and make resize
var jobs = [];
var imageProcessing;
var modulesPath = require("path").join(__dirname, options.modulesPath);

fs.readdir( modulesPath, function( err, modules ){
  console.log(' Found modules: ' + modules.join(', '));
  modules.forEach( function( module ){
    var stats = fs.lstatSync(options.modulesPath+module);
    if (!stats.isDirectory()) {
    jobs.push( function(next){
      imageProcessing = require(options.modulesPath+module);
      next();
    });
    options.sizes.forEach( function( size ){
      images.forEach( function(image) {
        jobs.push( function(next){
          imageTo = image.to.replace( /\.([^\.]*?)$/, "-" + size[0] + "x" + size[1] + ".$1" );
          imageProcessing.process(image.from, imageTo, size, function(err, result){
            console.log('done ' + size);
            next();
          });
        });
      });
    });
    jobs.push( function(next){
      console.log('== DONE ==');
      next();
    });
    }
  });
  async.waterfall(jobs, function(err) {
    console.log('== DONE ==?????????');
  });
});


function resizeWithModule( process, size, images, callback ){
//  images.forEach( function(image) {
//    console.log(image);
//    process(image.from, image.to, size, callback);
//  });

//  sleep.sleep(1);
//  callback();
/*
  var count = 0;
  var cpuIdleMin, freeMemMin, loadAvgMax;

  fs.readdir(pathSource, function( err, files ){
    for (var i = 0; i < files.length; i++) {
      var imageName = files[i];
        var fullImagePath = pathSource + imageName;
        var fullImagePathResult = pathResult + imageName.replace(/(\..*?)$/, '_' + size[0] + '.jpg');

        imageProcessing.process( fullImagePath, fullImagePathResult, size, function(){
          count++;

          // store wrose system info
          for(var cpuId = 0, len = cpus.length; cpuId < len; cpuId++) {
            var cpu = cpus[cpuId];
            var total = 0;
            for(type in cpu.times) 
              total += cpu.times[type];
            var cpuIdleLast = Math.round(100 * cpu.times['idle'] / total);
            if (!cpuIdleMin || cpuIdleMin > cpuIdleLast)
              cpuIdleMin = cpuIdleLast;
          }
          if (!freeMemMin || freeMemMin > os.freemem())
            freeMemMin = os.freemem();
          if (!loadAvgMax || loadAvgMax < os.loadavg()[0])
            loadAvgMax = os.loadavg()[0];

          if( count == files.length ) {
            callback( null,
//                ', duration: ' + Math.round(duration*100)/100 + 'sec, '
//              + ( Math.round(count/duration*100)/100 ) + 'img/sec'
              + '. minCPUidle:' + cpuIdleMin + '%'
              + '. minFreeMem:'+ Math.round(freeMemMin/1000000) + 'Mb'
              + '. MaxLoadAvg:'+ Math.round(loadAvgMax*100)/100 + '' );
          }
        })
    }
  })
*/
}


/*


var hrTime, timeBegin, imageProcessing;

function resizeUsingModule( module, size, callback ){
  var count = 0;
  var cpuIdleMin, freeMemMin, loadAvgMax;

  fs.readdir(pathSource, function( err, files ){
    for (var i = 0; i < files.length; i++) {
      var imageName = files[i];
        var fullImagePath = pathSource + imageName;
        var fullImagePathResult = pathResult + imageName.replace(/(\..*?)$/, '_' + size[0] + '.jpg');

        imageProcessing.process( fullImagePath, fullImagePathResult, size, function(){
          count++;

          // store wrose system info
          for(var cpuId = 0, len = cpus.length; cpuId < len; cpuId++) {
            var cpu = cpus[cpuId];
            var total = 0;
            for(type in cpu.times) 
              total += cpu.times[type];
            var cpuIdleLast = Math.round(100 * cpu.times['idle'] / total);
            if (!cpuIdleMin || cpuIdleMin > cpuIdleLast)
              cpuIdleMin = cpuIdleLast;
          }
          if (!freeMemMin || freeMemMin > os.freemem())
            freeMemMin = os.freemem();
          if (!loadAvgMax || loadAvgMax < os.loadavg()[0])
            loadAvgMax = os.loadavg()[0];

          if( count == files.length ) {
            callback( null,
//                ', duration: ' + Math.round(duration*100)/100 + 'sec, '
//              + ( Math.round(count/duration*100)/100 ) + 'img/sec'
              + '. minCPUidle:' + cpuIdleMin + '%'
              + '. minFreeMem:'+ Math.round(freeMemMin/1000000) + 'Mb'
              + '. MaxLoadAvg:'+ Math.round(loadAvgMax*100)/100 + '' );
          }
        })
    }
  })
}

var jobs = [];

// Get the names of image processing modules
var modulesPath = require("path").join(__dirname, "modules");
fs.readdir( modulesPath, function( err, modules ){

for (var m = 0; m < modules.length; m++) {
  function v ( module ) {
  jobs.push( function( callback ){
    for( var i = options.cooldownTimeout; i > 0; i-- ) {
      process.stdout.write( i + ' seconds cool down sleep  \r' );
      sleep.sleep(1);
//      callback();
    }

    imageProcessing = require('./modules/'+module);
    hrTime = process.hrtime();
    timeBegin = hrTime[0] * 1000000 + hrTime[1] / 1000;
  });
  }
  v( modules[m] );
  for (var j = 0; j<options.sizes.length; j++) {
    function v2 ( module, size ) {
        jobs.push( function( callback ){
          resizeUsingModule( module, size, callback );
        });
    }
    v2( modules[m], options.sizes[j] );
  }
  jobs.push( function( callback ){
    hrTime = process.hrtime();
    var timeEnd = hrTime[0] * 1000000 + hrTime[1] / 1000;
    var duration = Math.round(timeEnd-timeBegin)/1000000;
    console.log();
    callback();
  });
}

async.waterfall( jobs, function (err, result) {} );

});

*/