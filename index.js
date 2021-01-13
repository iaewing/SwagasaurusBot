const fs = require('fs');
//Add my discord.js dependency
const Discord = require('discord.js');
//Adds the configuration JSON as a dependency
const { prefix, token } = require('./config.json');
//create my client
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//Run this once at ready
client.once('ready', () => {
  console.log('Ready');
});

client.on('message', message => {
  //Check for prefix and to make sure its not from a bot
  if (!message.content.startsWith(prefix) || message.author.bot) {
    return;
  }

  //Grab just the args into an array by slicing the prefix number of characters
  //and trimming whitepsace
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  //Grab the first arg and lowercase it
  const command = args.shift().toLowerCase();

	if (command === 'magic') {
    message.channel.send(`Get Rekt ${message.author}`);
  } else if (command === 'beep') {
    message.channel.send('Boop');
  } else if (command === 'server') {
    message.channel.send(`This server's name is: ${message.guild.name}\n
    Total members: ${message.guild.memberCount}`);
  } else if (command === 'user-info') {
    message.channel.send(`Your username: ${message.author.username}\n
      Your ID: ${message.author.id}`);
  } else if (command === 'args-info') {
    if (!args.length) {
      return message.reply(', you did not provid any arguments!');
    }
    message.channel.send(`Command name: ${command}\nArguments: ${args}`);
  }
});

//Ignore this

//Log the bot into Discord using the token
client.login(token);
