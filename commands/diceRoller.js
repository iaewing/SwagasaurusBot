/* File Name: diceRoller.js
 * Purpose: implementation of a basic dice roller for a discord bot

 * Revision History:
 *   Created 2021-1-13
 *   Timothy Nigh
 *   Rewritten 2021-7-25
 *   Silas (ExVacuum)
 */
const { SlashCommandBuilder } = require("@discordjs/builders");

/*
  This is a basic dice regex that handles the format <x>d<y>[k<z>]`
  where x is the number of dice (0-999) and y is the number of sides of
  each die (0-999), and z is the number of the highest dice to keep (0-999).
  The pattern can be repeated an arbitrary number of times, seperated by a
  whitespace character.
*/
const diceRegex = /^(?:\s(?:\d{1,3})d(?:\d{1,3})(k(?:\d{1,3}))?)*$/;

const ARG = {
  num: 0,
  sides: 1,
  keep: 2,
};

const STATUS = {
  keptMoreThanRolled: {
    flag: 0b0001,
    message: (args) => `Why do you want me to keep the top ${args[ARG.keep]} of ${args[ARG.num]} dice roll${args[ARG.num] > 1 ? 's' : ''}?\n`,
  },
  keptZero: {
    flag: 0b0010,
    message: () => 'Why do you want me to keep 0 rolls?\n',
  },
  zeroSides: {
    flag: 0b0100,
    message: () => 'Why do you want me to roll dice with 0 sides?\n',
  },
  rolledZero: {
    flag: 0b1000,
    message: () => 'Why do you want me to roll 0 dice?\n',
  },
};

function validateArgs(args) {
  let status = 0b0000;
  if (args[ARG.keep] !== undefined) {
    status |= (args[ARG.keep] > args[ARG.num]) * STATUS.keptMoreThanRolled.flag;
    status |= (args[ARG.keep] === 0) * STATUS.keptZero.flag;
  }
  status |= (args[ARG.sides] === 0) * STATUS.zeroSides.flag;
  status |= (args[ARG.num] === 0) * STATUS.rolledZero.flag;
  return status;
}

function getStatusMessage(status, args) {
  let message = '';
  Object.values(STATUS).forEach((stat) => {
    if ((status | stat.flag) === status) {
      message = message.concat(stat.message(args));
    }
  });
  message = message.concat('I\'m not doing that, you\'re insane.\n\n');
  return message;
}

function rollDice(dice, message) {
  let returnMessage = message;
  const args = dice.split(/d|k/gm);
  args.forEach((arg, i) => { args[i] = Number.parseInt(args[i], 10); });
  let results = [];
  const status = validateArgs(args);
  if (status !== 0) {
    returnMessage = returnMessage.concat(getStatusMessage(status, args));
    return returnMessage;
  }

  returnMessage = returnMessage.concat(`${args[ARG.keep] ? `Top ${args[ARG.keep]} of `
    : ''}${args[ARG.num]} ${args[ARG.sides]}-sided di${args[ARG.sides] > 1 ? 'ce' : 'e'} roll${args[ARG.num] > 1 ? 's' : ''}:\n`);
  for (let i = 0; i < args[ARG.num]; i++) {
    results.push(Math.floor(Math.random() * args[ARG.sides] + 1));
  }
  if (args[ARG.keep]) {
    results.sort((a, b) => b - a);
    results = results.slice(0, args[ARG.keep]);
  }
  returnMessage = returnMessage.concat('```\n');
  for (let i = 0; i < results.length; i++) {
    returnMessage = returnMessage.concat(`${i === 0 ? '' : ', '}${results[i]}`);
  }
  returnMessage = returnMessage.concat('```\n');
  return returnMessage;
}

module.exports = {
  name: 'r',
  description: 'roll dice',
  execute(message) {
    const diceString = message.content.replace('!r', '');
    let returnMessage = 'I literally have no idea what you\'re talking about.';
    if (diceRegex.test(diceString)) {
      let diceSets = diceString.split(/\s/gm);
      diceSets = diceSets.slice(1);
      returnMessage = '';
      diceSets.forEach((dice) => { returnMessage = rollDice(dice, returnMessage); });
    }
    message.channel.send(returnMessage.length <= 2000 ? returnMessage : 'This command would have generated way too much output, please try something else.');
  },
};
