'use strict';
var config = require('config');
var fs = require('fs');
var staticPath = './test/static/';

// Ensure sharp is required before canvas - https://github.com/lovell/sharp/issues/371
require('sharp');

describe('Check modules', function () {

  var modulesPath = require("path").join(__dirname, '../', config.get('modulesPath'));
  fs.readdir( modulesPath, function (err, modules) {
    modules = modules.filter( function (item) {
      return fs.lstatSync(config.get('modulesPath') + item).isFile();
    });

    modules.forEach( function( module ){
      describe('module ' + module, function () {
        var ip = require(modulesPath+module);

        it( 'module has process function', function (done) {
          ip.should.have.property('process');
          ip.process.should.be.an.instanceOf(Function);
          done();
        });

        var origin = staticPath+'original.jpg';
        var result = staticPath+'result.jpg';

        it( 'checking reduxtion results', function (done) {
          ip.process(origin, result, [150,150], function(err){
            (err === undefined).should.be.true;
            var statsOrigin = fs.statSync( origin );
            var statsResult = fs.statSync( result );
            statsResult.size.should.be.above(0).and.below( statsOrigin.size );
            fs.unlinkSync( result );
            done();
          });
        });

        it( 'checking shrink results', function (done) {
          ip.process(origin, result, [1200,1200], function(err){
            (err === undefined).should.be.true;
            var statsOrigin = fs.statSync( origin );
            var statsResult = fs.statSync( result );
            statsResult.size.should.be.above(0).and.above( statsOrigin.size );
            fs.unlinkSync( result );
            done();
          });

        });

      });
    });

  });
});
