/* File:      beep.js
Description:  Receives a !ping command and returns "Pong"
Inputs:       message, args
Created:      Jan 12, 2021
Author:       Ian Ewing
*/

const commands = require('../commands');

module.exports = {
  name: 'ping',
  description: 'Take a guess',
  execute(interaction, client) {
    commands.sendImmediateResponseMessage(interaction, client, { content: 'Pong!' });
  },
};
