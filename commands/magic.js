/* File:      magic.js
Description:  Receives a !magic command and tells the caller to "get rekt"
Inputs:       message, args
Created:      Jan 12, 2021
Author:       Ian Ewing
*/
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("magic")
    .setDescription("Wuddup Penn & Teller"),
  execute(interaction) {
    interaction.reply(
      "https://images-ext-2.discordapp.net/external/lEBs9KPBUCMf8uSgiDoJgddg9iXvIMDVn5D97PiDijk/%3Fcid%3D73b8f7b176deec318852d1efdc4a74f51829faf3b9f79ca6%26rid%3Dgiphy.mp4%26ct%3Dg/https/media0.giphy.com/media/Sf0lxerEx2eNG/giphy.mp4"
    );
  },
};
