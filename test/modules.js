'use strict';
var config = require('config');
var fs = require('fs');

describe('Check modules', function () {

  var modulesPath = require("path").join(__dirname, '../', config.get('modulesPath'));
  fs.readdir( modulesPath, function (err, modules) {
    modules = modules.filter( function (item) {
      return fs.lstatSync(config.get('modulesPath') + item).isFile();
    });

    modules.forEach( function( module ){
      describe('module ' + module, function () {
        it( 'module has process function', function (done) {
          var imageProcessing = require(modulesPath+module);
          imageProcessing.should.have.property('process');
          imageProcessing.process.should.be.an.instanceOf(Function);
          done();
        });
      });
    });

  });
});
