'use strict';

if (process.argv.length <= 3) {
  console.log("Usage: " + __filename + " <path/to/original> <path/to/result>");
  process.exit(-1);
}

var config = require('config');
var fs = require('fs');
var async = require('async');
var sleep = require('sleep');
var os = require("os");
var cpus = os.cpus();

// Ensure sharp is required before canvas - https://github.com/lovell/sharp/issues/371
require('sharp');

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
var imageProcessing, timeBegin, currentStep, systemParameters;
var modulesPath = require("path").join(__dirname, config.get('modulesPath'));
var totalSteps = images.length * config.get('sizes').length;

fs.readdir( modulesPath, function (err, modules) {
  modules = modules.filter( function (item) {
    return fs.lstatSync(config.get('modulesPath') + item).isFile();
  });
  console.log('Found modules: ' + modules.join(', '));
  console.log('== START ==');
  modules.forEach( function( module ){
    // prepare job array for async
    jobs.push( function(next){
      for( var i = config.get('cooldownTimeout'); i > 0; i-- ) {
        process.stdout.write( i + ' seconds cool down sleep  \r' );
        sleep.sleep(1);
      }
      currentStep = 0;
      imageProcessing = require(modulesPath+module);
      var hrTime = process.hrtime();
      systemParameters = getRelationParameters({});
      timeBegin = hrTime[0] * 1000000 + hrTime[1] / 1000;
      next();
    });
    config.get('sizes').forEach( function( size ){
      images.forEach( function(image) {
        jobs.push( function(next){
          var imageTo = image.to.replace( /\.([^\.]*?)$/, "-" + size[0] + "x" + size[1] + ".$1" );
          imageProcessing.process(image.from, imageTo, size, function(err, result){
            systemParameters = getRelationParameters(systemParameters);
            process.stdout.write('\r' + module
              + " : steps "+ (++currentStep) + "/" + totalSteps 
              + '; size ' + size );
            next();
          });
        });
      });
    });
    jobs.push( function(next){
      var hrTime = process.hrtime();
      var timeEnd = hrTime[0] * 1000000 + hrTime[1] / 1000;
      var duration = Math.round(timeEnd-timeBegin)/1000000;
      var ips = Math.round( totalSteps / duration * 1000 )/1000;
      console.log( '\r'+ module + ' : ' + ips +' img/sec; done in ' + duration + ' sec'
        + '; minCPUidle: '+ systemParameters.cpuIdleMin + '%'
        + '; minFreeMem: '+ Math.round(systemParameters.freeMemMin/1000000) + 'Mb'
        + '; MaxLoadAvg: '+ Math.round(systemParameters.loadAvgMax*100)/100 + '' );
      next();
    });
  });
  async.waterfall(jobs, function(err) {
    console.log('== DONE ==');
  });
});

function getRelationParameters (params) {
  if (!params.freeMemMin || params.freeMemMin > os.freemem())
    params.freeMemMin = os.freemem();
  if (!params.loadAvgMax || params.loadAvgMax < os.loadavg()[0])
    params.loadAvgMax = os.loadavg()[0];
  for(var cpuId = 0, len = cpus.length; cpuId < len; cpuId++) {
    var cpu = cpus[cpuId];
    var total = 0;
    for(var type in cpu.times) 
      total += cpu.times[type];
    var cpuIdleLast = Math.round(100 * cpu.times['idle'] / total);
    if (!params.cpuIdleMin || params.cpuIdleMin > cpuIdleLast)
      params.cpuIdleMin = cpuIdleLast;
  }
  return (params);
}
