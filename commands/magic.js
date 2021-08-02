/* File:      magic.js
Description:  Receives a !magic command and tells the caller to "get rekt"
Inputs:       message, args
Created:      Jan 12, 2021
Author:       Ian Ewing
*/

const { commands } = require('../subsystems');

module.exports = {
  name: 'magic',
  description: 'Get rekt scrub',
  execute(interaction, client) {
    commands.sendImmediateResponseMessage(interaction, client, { content: 'get rekt.' });
  },
};
