'use strict';

const {IN: pathSource, OUT: pathResult, COOLDOWN: coolingDownTimeoutEnv} = process.env;

if(!pathSource) throw new Error('define IN envirement by `export IN=<path/to/original>`');
if(!pathResult) throw new Error('define OUT envirement by `export IN=<path/to/result>`');

const fs = require('fs');
const os = require('os');
const cpus = os.cpus();

const path = require('path');
const{ imageModulesPath, coolingDownTimeout, sizes } = require('./config');
const coolingDownTime = coolingDownTimeoutEnv || coolingDownTimeout || 60;

/**
 * Async sleep
 * @param ms - milliseconds to resolve
 * @returns {Promise} - resolves after ms milliseconds
 */
const sleep = async ms => new Promise(resolve => setTimeout(resolve, ms || 1000));

/**
 * Cooling down before test of each module
 * @param ms - milliseconds to resolve
 * @returns {Promise} - resolves after ms milliseconds
 */
const coolingDown = async (sec = coolingDownTime) => {
  while(sec-- > 0) {
    process.stdout.write(`[cooling down] ${sec+1} seconds to go...  \r` );
    await sleep();
  }
}

const images = fs.readdirSync(pathSource);
const modulesPath = path.join(__dirname, imageModulesPath);
const totalSteps = images.length * sizes.length;

fs.readdir( modulesPath, async function (err, modules) {
  if(err) throw new Error(err);
  modules = modules.filter(item => fs.lstatSync(modulesPath + item).isFile());

  console.log('Images found:', images.length);
  console.log('Modules found:', modules.length);
  console.log('List of modules:', modules.join(', '));
  console.log('Time for cooling down before each modulle, sec:', coolingDownTime);
  console.log('== START ==');
  console.log('\rname;images/sec;time spent, sec;minCPUidle;minFreeMem, Mb;MaxLoadAvg');

  for(const module of modules) {
    await coolingDown();
    try {
      const [sec1, nsec1] = process.hrtime();

      const {freeMemMin, loadAvgMax, cpuIdleMin} = await processModule(module);

      const [sec2, nsec2] = process.hrtime();

      const timeBegin = sec1 + nsec1 / 1000000000;
      const timeEnd = sec2 + nsec2 / 1000000000;
      const duration = (timeEnd - timeBegin).toFixed(3);
      const ips = (totalSteps / duration).toFixed(3);
      console.log(`\r${module};${ips};${duration};${cpuIdleMin}%;${(freeMemMin/10048576).toFixed(0)};` +
        `${loadAvgMax.toFixed(2)}                                              `);
    } catch(err) {
      console.log(`\r${module};${err}`);
    }
  }

  console.log('== END ==');
});

/**
 * Test package
 * @param module - package name
 * @returns {freeMemMin, loadAvgMax, cpuIdleMin} - system parameters
 */
async function processModule(module) {
  let systemParameters = getRelationParameters({});
  const imageProcessing = require(path.join(modulesPath, module));
  let currentStep = 0;

  for(const size of sizes) {
    for(const image of images) {
      const from = path.join(pathSource, image);
      const to = path.join(pathResult, image).replace(/\.([^\.]*?)$/, `-${size[0]}x${size[1]}.$1`);
      await imageProcessing.process({from, to, size});
      systemParameters = getRelationParameters(systemParameters);
      process.stdout.write(`\r${module} : steps ${++currentStep}/${totalSteps}; size ${size}`);
    };
  };
  return systemParameters;
}

/**
 * Get systems parameters
 * @param freeMemMin - free memory, min
 * @param loadAvgMax - load average, max
 * @param cpuIdleMin = CPU idle, min
 * @returns {freeMemMin, loadAvgMax, cpuIdleMin} - updated system parameters
 */
function getRelationParameters ({freeMemMin = Infinity, loadAvgMax = 0, cpuIdleMin = Infinity}) {
  const [freemem, loadavg] = [os.freemem(), os.loadavg()[0]];
  if (freeMemMin > freemem) freeMemMin = freemem;
  if (loadAvgMax < loadavg) loadAvgMax = loadavg;

  for(let cpu of cpus) {
    const total = Object.keys(cpu.times).reduce((acc, key) => acc + cpu.times[key], 0);
    const cpuIdleLast = Math.round(100 * cpu.times.idle / total);
    if (cpuIdleMin > cpuIdleLast) cpuIdleMin = cpuIdleLast;
  }
  return ({freeMemMin, loadAvgMax, cpuIdleMin});
}
