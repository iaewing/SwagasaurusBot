/* File:      server.js
Description:  Allows a user to gain basic information about themselves. 
Inputs:       message, args
Created:      Jan 12, 2021
Author:       Ian Ewing
*/

const commands = require('../commands');

module.exports = {
  name: 'user-info',
  description: 'Returns the callers username and ID',
  execute(interaction, client) {
    commands.sendImmediateResponseMessage(interaction, client, { content: `Your username: ${interaction.member.user.username}\n
        Your ID: ${interaction.member.user.id}` });
  },
};
