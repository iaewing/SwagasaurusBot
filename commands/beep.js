/* File:      beep.js
Description:  Receives a !beep command and returns "Boop"
Inputs:       message, args
Created:      Jan 12, 2021
Author:       Ian Ewing
*/
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder().setName('beep').setDescription('Definitely not a robot'),
  async execute(interaction) {
    await interaction.reply("Boop!");
  }
};