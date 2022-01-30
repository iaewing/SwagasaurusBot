/* File:      server.js
Description:  Allows a user to gain basic information about the server.
Inputs:       message, args
Created:      Jan 12, 2021
Author:       Ian Ewing
*/
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder().setName('server').setDescription('Returns basic information about the server'),
  async execute(interaction) {
    await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
  }
};