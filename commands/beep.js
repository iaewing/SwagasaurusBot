/* File:      beep.js
Description:  Receives a !beep command and returns "Boop"
Inputs:       message, args
Created:      Jan 12, 2021
Author:       Ian Ewing
*/

const commands = require('../commands');

module.exports = {
  name: 'beep',
  description: 'Definitely not a robot',
  execute(interaction, client) {
    commands.sendImmediateResponseMessage(interaction, client, { content: 'Boop!' });
  },
};
