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
//Grab every file from the commands folder with the .js extension into an array
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//We're going to fill the client.commands collection dynamically with whatever
//comands are stored in ./commands. This will allow flexibility to add/remove
//commands as needed.
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
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

client.on('guildMemberAdd', member => {
  //member.channel.send('**' + member.user.username + '**, has joined the server!');
  const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
  console.log(channel);
  channel.send(`** ${member.user.username} **, has joined the server! Please select an emoji for the year you are in`)
         .then(sentEmbed=> {sentEmbed.react(':one:')
          .then(':two:')
          .then(':three:')});
});

//Handle the sending of a message in the 'welcome' channel
//Reacts to the message with three emoji
client.on('message', message=>{
  if(message.channel.name === 'welcome'){
    message.react(':one:')
    .then(':two:')
    .then(':three:');
  }
});



//Log the bot into Discord using the token
client.login(token);
