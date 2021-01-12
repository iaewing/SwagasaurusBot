//Add my discord.js dependency
const Discord = require('discord.js');
//Adds the configuration JSON as a dependency
const { prefix, token } = require('./config.json');
//create my client
const client = new Discord.Client();

//Run this once at ready
client.once('ready', () => {
  console.log('Ready');
});

client.on('message', message => {
	if (message.content === `${prefix}magic`) {
    message.channel.send(`Get Rekt ${message.author.username}`);
  } else if (message.content ===`${prefix}beep`) {
    message.channel.send('Boop');
  } else if (message.content === `${prefix}server`) {
    message.channel.send(`This server's name is: ${message.guild.name}\n
    Total members: ${message.guild.memberCount}`);
  } else if (message.content === `${prefix}user-info`) {
    message.channel.send(`Your username: ${message.author.username}\n
      Your ID: ${message.author.id}`);
  }
});

//Ignore this

//Log the bot into Discord using the token
client.login(token);
