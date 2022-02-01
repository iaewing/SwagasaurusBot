/* File:      beep.js
Description:  Receives a !beep command and returns "Boop"
Inputs:       message, args
Created:      Jan 12, 2021
Author:       Ian Ewing
*/
// import spongebobify from 'spongebobify';
const spongebobify = require("spongebobify");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("spongebob")
    .setDescription("For when you really need to savage someone...")
    .addStringOption((option) =>
      option.setName("input").setDescription("Enter a string")
    ),
  execute(interaction) {
    const stringToSpongebob = interaction.options.getString("input");
    if (stringToSpongebob) {
      interaction.reply(spongebobify(stringToSpongebob));
    }
  },
};
