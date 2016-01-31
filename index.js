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

var pathSource = process.argv[2] + '/';
var pathResult = process.argv[3] + '/';

var options = {
  cooldownTimeout: 1,   // time out to cooldown, sec
  modules: [
    'canvas',
    'gm',
    'gm-imagemagic',
    'imagemagick',
    'lwip',
  ],
  sizes: [
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

function resizeUsingModule( module, callback ){

  for( var i = options.cooldownTimeout; i > 0; i-- ) {
    process.stdout.write( i + ' seconds cool down sleep  \r' );
    sleep.sleep(1);
  }

  var hrTime = process.hrtime();
  var timeBegin = hrTime[0] * 1000000 + hrTime[1] / 1000;
  var count = 0;
  var cpuIdleMin, freeMemMin, loadAvgMax;

  var imageProcessing = require('./modules/'+module);

  fs.readdir(pathSource, function( err, files ){
    for (var i = 0; i < files.length; i++) {
      var imageName = files[i];
      for (var j = 0; j < options.sizes.length; j++) {
        var size = options.sizes[j];
        var fullImagePath = pathSource + imageName;
        var fullImagePathResult = pathResult + imageName.replace(/(\..*?)$/, '_' + size[0] + '.jpg');

        imageProcessing.process( fullImagePath, fullImagePathResult, size, function(){
          hrTime = process.hrtime();
          var timeEnd = hrTime[0] * 1000000 + hrTime[1] / 1000;
          var duration = Math.round(timeEnd-timeBegin)/1000000;
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

          process.stdout.write( '[' + module + '] process ' 
                                + count + '/' + files.length * options.sizes.length 
                                + ', duration: ' + duration + 'sec, ' 
                                + ( count/duration ) + 'img/sec'
                                + '. Min CPU idle: ' + cpuIdleMin + '%'
                                + '. Min free mem: '+ freeMemMin/1000000 + 'Mb'
                                + '. Max load avg: '+ loadAvgMax + ''
                                + '            \r' );

          if( count == files.length * options.sizes.length ) {
            console.log();
            callback();
          }
        })
      }
    }
  })
}

var jobs = [];
for (var m = 0; m < options.modules.length; m++) {
  function v ( module ) {
    jobs.push( function( callback ){ 
      resizeUsingModule( module, callback );
    });
  };
  v( options.modules[m] );
}

async.waterfall( jobs, function (err, result) {} );
