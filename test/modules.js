const config = require('../src/config');
const fs = require('fs');
const path = require('path');
const staticPath = './test/static/';

// Ensure sharp is required before canvas - https://github.com/lovell/sharp/issues/371
require('sharp');

describe('Check modules', function () {

  const modulesPath = path.join(__dirname, '../src/', config.imageModulesPath);
console.log(modulesPath);
  fs.readdir( modulesPath, function (err, modules) {
    modules = modules.filter( function (item) {
      return fs.lstatSync(path.join(__dirname, '../src/', config.imageModulesPath, item)).isFile();
    });

    modules.forEach( function( module ){
      describe('module ' + module, function () {
        const ip = require(modulesPath+module);

        it( 'module has process function', function (done) {
          ip.should.have.property('process');
          ip.process.should.be.an.instanceOf(Function);
          done();
        });

        const from = staticPath+'original.jpg';
        const to = staticPath+'result.jpg';

        it( 'checking reduxtion results', function (done) {
          ip.process({from, to, size: [150,150]})
          .then(() => {
            const statsOrigin = fs.statSync( from );
            const statsResult = fs.statSync( to );
            statsResult.size.should.be.above(0).and.below( statsOrigin.size );
            fs.unlinkSync( to );
            done();
          })
          .catch(done);
        });

        it( 'checking shrink results', function (done) {
          ip.process({from, to, size:[1200,1200]})
          .then(() => {
            (err === undefined).should.be.true;
            const statsOrigin = fs.statSync( from );
            const statsResult = fs.statSync( to );
            statsResult.size.should.be.above(0).and.above( statsOrigin.size );
            fs.unlinkSync( to );
            done();
          })
          .catch(done);
        });

      });
    });

  });
});
