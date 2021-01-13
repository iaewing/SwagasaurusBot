//Grab Node.js' file system so we can grab commands
const fs = require('fs');
//Add my discord.js dependency
const Discord = require('discord.js');
//Adds the configuration JSON as a dependency
const { prefix, token } = require('./config.json');
//create my client
const client = new Discord.Client();
//Create a collection to hold all commands
client.commands = new Discord.Collection();
//Create a collection of role assignments
roleCollection = new Discord.Collection();
//Grab every file from the commands folder with the .js extension into an array
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
//Grab every file from the roles folder with the .js extension
const roleAssigns = fs.readdirSync('./roles').filter(file => file.endsWith('.js'));

const emojiRoles = ['1️⃣','2️⃣','3️⃣','🐔','🇦'];

//We're going to fill the client.commands collection dynamically with whatever
//comands are stored in ./commands. This will allow flexibility to add/remove
//commands as needed.
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

//We're going to fill the client.commands collection dynamically with whatever
//comands are stored in ./commands. This will allow flexibility to add/remove
//commands as needed.
for (const file of roleAssigns) {
  const roles = require(`./roles/${file}`);
  roleCollection.set(roles.name, roles);
}

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

  //Does the message contain a command from our collection? If no, return early.
  if (!client.commands.has(command)) {
    return;
  }

  try {
    //Try to execute the command entered, as pulled from our collection.
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('something broke while trying to do that!');
  }
});

client.on('messageDelete', message => {
  message.channel.send(`Uh oh! ${message.author.username} is trying to hide something!\n
    Here it is: \"${message}\"`);
});

//Greets new users
client.on('guildMemberAdd', member => {
  //Grabs the welcome channel for sending messages
  const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');

  //Greets the user by tagging them. Displays emjois asking them to select
  //roles that apply to them.
  channel.send(`${member.user.toString()}, has joined the server! Please select an emoji for the year you are in. Select the chicken (get it? Chicken? because chickens live in a chicken coop. And coop is like co-op. har har) if you are in Co-op and A if you are an alumnus. SWAGBOT OUT! #micdrop`)
         .then(sentEmbed=> { sentEmbed.react('1️⃣')
          .then(sentEmbed.react('2️⃣')
          .then(sentEmbed.react('3️⃣'))
          .then(sentEmbed.react('🐔'))
          .then(sentEmbed.react('🇦'))
        )});
});

client.on('messageReactionAdd', (messageReaction, user) => {
    const chosenEmoji = messageReaction.emoji.name;
    //If the reaction is not in our message channel, we don't care about it.
    if (messageReaction.message.channel.name !== 'welcome')
    {
      return;
    }
    if (emojiRoles.includes(chosenEmoji)) {
      //do stuff
      //call command of chosenEmoji
      try {
        //Try to execute the command entered, as pulled from our collection.
        roleCollection.get(name).execute(message, args);
      } catch (error) {
        console.error(error);
        message.reply('something broke while trying to do that!');
      }
    }
})




//Log the bot into Discord using the token
client.login(token);
