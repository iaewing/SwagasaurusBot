//Add my discord.js dependency
const Discord = require('discord.js');

//create my client
const client = new Discord.Client();

//For easy removal before posting somewhere
const token = "Nzk4NjYyMzIzMTE1Nzg2Mjgw.X_4SQA.9nUYIW0gsS8yjD1aHmlR1UbdExc";


client.on('message', message => {
	if (message.content === '!magic') {
    message.channel.send('Get Rekt Cam');
  }
});

//Run this once at ready
client.once('ready', () => {
  console.log('Ready');
});

//Log the bot into Discord using the token
client.login(token);
