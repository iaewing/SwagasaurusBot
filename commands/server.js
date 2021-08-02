/* File:      server.js
Description:  Allows a user to gain basic information about the server.
Inputs:       message, args
Created:      Jan 12, 2021
Author:       Ian Ewing
*/

const { commands } = require('../subsystems');

module.exports = {
  name: 'server',
  description: 'Returns basic information about the server',
  async execute(interaction, client) {
    const guild = await client.guilds.fetch(interaction.guild_id);
    commands.sendImmediateResponseMessage(interaction, client, {
      content: `This server's name is: ${guild.name}\n
      Total members: ${guild.memberCount}`,
    });
  },
};
