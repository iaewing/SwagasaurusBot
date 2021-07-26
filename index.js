/*
Program:      Swagasaurus Bot
Description:  Bot utilizing node.js and discord.js. Preforms basic functionality
              such as greeting new users and assigning them roles based on their
              selection of an emoji on a welcome message. Also contains commands
              triggered by certain text commands prefixed with a "!"
Authors:      Ian Ewing and Timothy Nigh
Created:      January 12, 2021
Updated:      July 23, 2021
*/

const fs = require('fs'); // Grab Node.js' file system so we can grab commands
const { DiscordInteractions, InteractionResponseType, MessageFlags } = require('slash-commands');
const Discord = require('discord.js');
const { // Add the configuration JSON as a dependency
  prefix,
  token,
} = require('./config.json');

/*
 * ┌──────────────────────────────────────────────────────────────────────────────┐
 * │ INITIALIZATION                                                               │
 * └──────────────────────────────────────────────────────────────────────────────┘
 */

const client = new Discord.Client();
client.commands = new Discord.Collection();
const roleCollection = new Discord.Collection(); // Create a collection of role assignments
// Gather every file from the commands folder with the .js extension
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));
// Gather every file from the roles folder with the .js extension
const roleAssigns = fs.readdirSync('./roles').filter((file) => file.endsWith('.js'));
// The emojis prompting the user for role selection
const emojiRoles = ['1️⃣', '2️⃣', '3️⃣', '🐤', '🇦'];
// Load persistent data from file
let persistentData = JSON.parse(fs.readFileSync('./persistent.json'));
// Tracks the number of "nice" numbers tallied.
let { niceCount } = persistentData;

// Called once bot is ready
client.once('ready', () => {
  /*
    We're going to fill the client.commands collection dynamically with whatever
    comands are stored in ./commands. This will allow flexibility to add/remove
    commands as needed.
  */
  commandFiles.forEach((file) => {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
  });

  roleAssigns.forEach((file) => {
    const roles = require(`./roles/${file}`);
    roleCollection.set(roles.name, roles);
  });

  console.log('Ready');
});

function updatePersistentData(data) {
  persistentData = { ...persistentData, ...data };
  fs.writeFileSync('./persistent.json', JSON.stringify(persistentData));
}

/**
   @desc Determines whether the numbers 69 and/or 420 are in a given
   message (message is sanitized before testing), and generates an
   appropriate response.

   @param message the message to test
   @return generated response, defined if either number is found in
   the message.
 */
function niceCounter(message) {
  let returnMessage;
  if (/(^| )69($| )/gm.test(message)) { // Test for 69
    niceCount += 1;
    returnMessage = `69? Nice. There have been ${niceCount} nice words since this bot awakened.`;
  }
  if (/(^| )420($| )/gm.test(message)) { // Test for 420
    niceCount += 1;
    returnMessage = returnMessage
      ? `DAMN! 69 and 420!? There have been ${niceCount} nice words since this bot awakened`
      : `420!? BLAZE IT. There have been ${niceCount} nice words since this bot awakened`;
  }

  updatePersistentData({ niceCount });
  return returnMessage;
}

/**
   @desc Determines whether the words "Bern" or "Bernie" or the emoji :bern:
   appear in a given message, and generates an appropriate response.

   @param message the message to test
   @return generated response, defined if any match is found in
   the message.
 */
function theBern(message) {
  let returnMessage;
  if (/(^| |:)bern($| |:|ie)/gm.test(message.toLowerCase())) {
    returnMessage = 'FEEL THE BERN <:bern:802240138171514930>';
  }

  return returnMessage;
}

/**
   @desc Checks the message passed in for keywords (GME, stocks, stonks)
   if found, returns a string message.

   @param message message to test
   @return generated response, defined if any match is found in
   the message.
*/
function stonks(message) {
  let returnMessage;
  if (message.toLowerCase().includes('gme')) {
    returnMessage = 'ALL ABOARD! TO THE MOON';
  }

  if (!returnMessage && /(^| |[a-zA-Z]+)sto[nc]k($| |[a-zA-Z]+)/gm.test(message.toLowerCase())) {
    returnMessage = 'STONKS';
  }

  return returnMessage;
}

// Called whenever a message is sent
client.on('message', (message) => {
  if (!message.author.bot) { // Block bot messages
    /*
      Checks each message sent to see if it contains:
      - the command trigger (defined in config.json)
      - a valid command
    */
    if (!message.content.startsWith(prefix)) {
      // Check for a funny number
      const niceMessage = niceCounter(message.cleanContent, niceCount);
      if (niceMessage) {
        message.channel.send(niceMessage);
        return;
      }
      // Check for a Bernie emoji
      const bernMessage = theBern(message.content);
      if (bernMessage) {
        message.channel.send(bernMessage);
        return;
      }
      // Check for stocks keywords
      const stonksMessage = stonks(message.content);
      if (stonksMessage) {
        message.channel.send(stonksMessage, {
          files: ['https://i.imgur.com/EFqRbev.png'],
        });
      }
    }

    /*
      Grab just the args into an array by slicing the prefix number of characters
      and trimming whitepsace
    */
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    // Grab the first arg and lowercase it
    const command = args.shift().toLowerCase();

    // Does the message contain a command from our collection? If no, return early.
    if (!client.commands.has(command)) {
      return;
    }

    try {
      // Try to execute the command entered, as pulled from our collection.
      client.commands.get(command).execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply('something broke while trying to do that!');
    }
  }
});

/*
  When a new user joins the server this greets new users and prompts them to
  select an emoji corresponding to the appropriate role
*/
client.on('guildMemberAdd', (member) => {
  // Grabs the welcome channel for sending messages
  const channel = member.guild.channels.cache.find((ch) => ch.name === 'welcome');
  const rulesChannel = member.guild.channels.cache.find((ch) => ch.name === 'rules');

  /*
    Greets the user by tagging them. Links them to the rules channel and then
    displays emjois asking them to select roles that apply to them.
  */
  channel.send(`${member.user.toString()}, has joined the server! Make sure you visit <#${rulesChannel.id}> for our rules.\
   Please select an emoji for the year you are in. Select the chicken (get it? Chicken? because chickens live in a chicken\
   coop. And coop is like co-op. har har) if you are in Co-op and A if you are an alumnus. SWAGBOT OUT! #micdrop`)
    .then((sentEmbed) => {
      sentEmbed.react('1️⃣').then(sentEmbed.react('2️⃣').then(sentEmbed.react('3️⃣')).then(sentEmbed.react('🐤')).then(sentEmbed.react('🇦')));
    });
});

/*
  Channel that's exclusive to "Unassigned" roles.
  Pinned message with emojis corresponding to roles
  When the user selects one, they are assigned that role.
  This also removes them from the channel preventing multiple role selections.

  When an emoji is selected in the welcome channel by a user, this handles role
  assignment.
*/
client.on('messageReactionAdd', (messageReaction, user) => {
  const chosenEmoji = messageReaction.emoji.name;
  const {
    message,
  } = messageReaction;
  /*
    If the reaction is not in our message channel, we don't care about it.
    If the user is the bot, we don't care either
  */
  if (messageReaction.message.channel.name !== 'welcome' || user.bot) {
    return;
  }
  if (emojiRoles.includes(chosenEmoji)) {
    try {
      const member = message.guild.member(user);
      // Try to execute the command entered, as pulled from our collection.
      if (member !== null) {
        roleCollection.get(chosenEmoji).execute(member);
        // TODO: Remove the "Unassigned" role
      } else {
        message.channel.send('User does not exist in current guild.');
      }
    } catch (error) {
      console.error(error);
      message.channel.send('Something broke while trying to do that!');
    }
  }
});

// Log the bot into Discord using the token
client.login(token);
