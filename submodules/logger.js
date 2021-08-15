const chalk = require('chalk');
const chalkAnimation = require('chalk-animation');
const fs = require('fs');
const { CronJob } = require('cron');
const config = require('../config.json');

let { consoleMask, fileMask } = config.logger;
consoleMask = Number.parseInt(consoleMask, 2);
fileMask = Number.parseInt(fileMask, 2);

let fileStream = fs.createWriteStream(`./logs/${new Date().toDateString().replace(/\s/g, '_')}.ansi`, { flags: 'a' });

const LEVELS = {
  trace: {
    flag: 0b00001,
    color: 'grey',
  },
  info: {
    flag: 0b00010,
    color: 'green',
  },
  warning: {
    flag: 0b00100,
    color: 'yellow',
  },
  error: {
    flag: 0b01000,
    color: 'red',
  },
  critical: {
    flag: 0b10000,
    color: 'bgRed.white',
  },
};

// Here is our proxy to the chalk() template method.
function chalkish(parts, ...substitutions) {
  const rawResults = [];
  const cookedResults = [];
  const partsLength = parts.length;
  const substitutionsLength = substitutions.length;
  for (let i = 0; i < partsLength; i++) {
    rawResults.push(parts.raw[i]);
    cookedResults.push(parts[i]);
    if (i < substitutionsLength) {
      rawResults.push(substitutions[i]);
      cookedResults.push(substitutions[i]);
    }
  }
  const chalkParts = [cookedResults.join('')];
  chalkParts.raw = [rawResults.join('')];
  return (chalk(chalkParts));
}

function log(level, message) {
  const time = new Date().toLocaleTimeString();
  const toLog = chalkish`[${time}] ({${LEVELS[level].color} ${level}}): ${message}`;
  if ((consoleMask | LEVELS[level].flag) === consoleMask) {
    console.log(toLog);
  }
  if ((fileMask | LEVELS[level].flag) === fileMask) {
    fileStream.write(`${toLog}\n`);
  }
}

function setMaskLevel(mask, level, value) {
  return ((value === true) ? mask | LEVELS[level].flag : mask & LEVELS[level].flag);
}

function escapeCurly(string) {
  return string.replace(/{/g, '\\{').replace(/}/g, '\\}');
}

module.exports = {
  trace: (message) => log('trace', message),
  info: (message) => log('info', message),
  warning: (message) => log('warning', message),
  error: (message) => log('error', message),
  critical: (message) => log('critical', message),
  rainbow: (message) => chalkAnimation.rainbow(message),
  setFileMaskLevel: (level, value) => { fileMask = setMaskLevel(fileMask, level, value); },
  setConsoleMaskLevel: (level, value) => { consoleMask = setMaskLevel(consoleMask, level, value); },
  escapeCurly,
};

const dailyFileSwap = new CronJob('0 0 0 * * *', () => {
  fileStream = fs.createWriteStream(`./logs/${new Date().toDateString().replace(/\s/g, '_')}.ansi`, { flags: 'a' });
}, null, true, 'America/Toronto');
dailyFileSwap.start();
