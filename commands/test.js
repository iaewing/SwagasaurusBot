/* File:      test.js
Description:  Receives a !test command and returns an easter egg message
Inputs:       message, args
Created:      Jan 12, 2021
Author:       Ian Ewing
*/

const { commands } = require('../subsystems');

module.exports = {
  name: 'test',
  description: 'Test',
  execute(interaction, client) {
    commands.sendImmediateResponseMessage(interaction, client, 'YOU\'RE NOT MY REAL DAD');
  },
};
