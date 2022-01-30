/* File:      server.js
Description:  Allows a user to gain basic information about themselves. 
Inputs:       message, args
Created:      Jan 12, 2021
Author:       Ian Ewing
*/
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder().setName('user').setDescription('Returns the callers username and ID'),
  async execute(interaction) {
    await interaction.reply(`Your Username: ${interaction.author.ursername}\nYour ID: ${interaction.author.id}`);
  }
};