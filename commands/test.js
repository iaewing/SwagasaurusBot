/* File:      test.js
Description:  Receives a !test command and returns an easter egg message
Inputs:       message, args
Created:      Jan 12, 2021
Author:       Ian Ewing
*/
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Test Command - Do Not Use"),
  execute(interaction) {
    interaction.reply(
      "YOU'RE NOT MY REAL DAD"
    );
  },
};