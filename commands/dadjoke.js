/* File:      dadjoke.js
Description:  Receives a !dadjoke command and returns a dad joke from an online API
Inputs:       message, args
Created:      July 8, 2021
Author:       DanWritesCode / Dan
*/

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder().setName('dadjoke').setDescription('For all those times you miss your dad while he\'s out getting milk'),
  async execute(interaction) {
    const request = require("request");

        request({
                uri: "https://icanhazdadjoke.com/",
                headers: {
                    "Accept": "text/plain",
                    "User-Agent": "SwagasaurusBot Discord Bot (https://github.com/iaewing/SwagasaurusBot)"
                }
            },
            function(error, response, body) {
                if(error) {
                    interaction.reply("Sorry, looks like you're still waiting for dad to get home from getting smokes");
                    console.log(error);
                    return;
                }
                interaction.reply(body);
            }
        );
  }
};