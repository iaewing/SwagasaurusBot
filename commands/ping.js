/* File:      beep.js
Description:  Receives a !ping command and returns "Pong"
Inputs:       message, args
Created:      Jan 12, 2021
Author:       Ian Ewing
*/
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};