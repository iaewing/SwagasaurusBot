/*
Program:      Swagasaurus Bot
Description:  Bot utilizing node.js and discord.js. Preforms basic functionality
              such as greeting new users and assigning them roles based on their
              selection of an emoji on a welcome message. Also contains commands
              triggered by certain text commands prefixed with a "!"
Authors:      Ian Ewing and Timothy Nigh
Created:      January 12, 2021
*/

// const fs = require('fs');
// const Discord = require('discord.js');
const { token } = require("./config.json");
const { Client, Collection, Intents } = require("discord.js");
const fs = require("fs");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

// roleCollection = new Discord.Collection();

// const roleAssigns = fs.readdirSync('./roles').filter(file => file.endsWith('.js'));
// const emojiRoles = ['1️⃣','2️⃣','3️⃣','🐔','🇦'];
let niceCount = 0;

// for (const file of roleAssigns) {
//   const roles = require(`./roles/${file}`);
//   roleCollection.set(roles.name, roles);
// }

client.once("ready", () => {
  console.log("Ready");
});

//Checks each message sent to see if it contains the command trigger "!" and a
// //valid command.
// client.on("message", (message) => {
  // Check for prefix and to make sure its not from a bot
  //   Checks author to make sure it's not a bot
  //   if (!message.author.bot) {
  //     let niceMessage = niceCounter(message.content, niceCount)
  //     if(niceMessage !== -1) {
  //       message.channel.send(niceMessage);
  //     }
  //     //Check for a bernie emoji
  //     //Responds to the Bernie emoji with "FEEL THE BERN"
  //     let responseBern = theBern(message.content);
  //     if (responseBern !== -1)
  //     {
  //       message.channel.send(responseBern);
  //     }
  //     //Check for our stocks keywords
  //     //If found, respond with stonks meme
  //     let responseStocks = stonks(message.content);
  //     if (responseStocks !== -1)
  //     {
  //       message.channel.send(responseStocks, {files: ["https://i.imgur.com/EFqRbev.png"]});
  //     }
  //     if (yingbull(message.content) !== -1) {
  //       message.channel.send("https://giphy.com/gifs/the-breakfast-club-weird-science-8N5tQZ2X4byNi");
  //     }
  //     parseMessageForMemeseum(message.content, niceCount);
  //   }
  //   return;
  // });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand());

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  });

  //When a message is deleted; grab the message and "name and shame" the author
  /*
client.on('messageDelete', message => {
  message.channel.send(`Uh oh! ${message.author.username} is trying to hide something!\n
    Here it is: \"${message}\"`);
});
*/

  //When a new user joins the server this greets new users and prompts them to
  // //select an emoji corresponding to the appropriate role
  // client.on('guildMemberAdd', member => {
  //   //Grabs the welcome channel for sending messages
  //   const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
  //   const rulesChannel = member.guild.channels.cache.find(ch => ch.name === 'rules');

  //   //Greets the user by tagging them. Links them to the rules channel and then
  //   //displays emjois asking them to select roles that apply to them.
  //   channel.send(`${member.user.toString()}, has joined the server! Make sure you visit <#${rulesChannel.id}> for our rules. Please select an emoji for the year you are in. Select the chicken (get it? Chicken? because chickens live in a chicken coop. And coop is like co-op. har har) if you are in Co-op and A if you are an alumnus. SWAGBOT OUT! #micdrop`)
  //          .then(sentEmbed=> { sentEmbed.react('1️⃣')
  //           .then(sentEmbed.react('2️⃣')
  //           .then(sentEmbed.react('3️⃣'))
  //           .then(sentEmbed.react('🐔'))
  //           .then(sentEmbed.react('🇦'))
  //         )});
  // });

  //Channel that's exclusive to "Unassigned" roles.
  //Pinned message with emojis corresponding to roles
  //When the user selects one, they are assigned that role.
  //This also removes them from the channel preventing multiple role selections.

  //When an emoji is selected in the welcome channel by a user, this handles role
  // //assignment.
  // client.on('messageReactionAdd', (messageReaction, user) => {
  //     const chosenEmoji = messageReaction.emoji.name;
  //     let message = messageReaction.message;
  //     //If the reaction is not in our message channel, we don't care about it.
  //     //If the user is the bot, we don't care either
  //     if (messageReaction.message.channel.name !== 'welcome' || user.bot)
  //     {
  //       return;
  //     }
  //     if (emojiRoles.includes(chosenEmoji)) {
  //       //do stuff
  //       //call command of chosenEmoji
  //       try {
  //         let member = message.guild.member(user);
  //         //Try to execute the command entered, as pulled from our collection.
  //         //Our role modules
  //         if(member !== null){
  //           roleCollection.get(chosenEmoji).execute(member);
  //           //Remove the "Unassigned" role
  //         }else{
  //           message.channel.send("user does not exist in current guild");
  //         }
  //       } catch (error) {
  //         console.error(error);
  //         message.channel.send('something broke while trying to do that!');
  //       }
  //     }
  // })

  //This tallies and tracks whenever a user uses 69 or 420 in chat
  function niceCounter(message) {
    if (message.includes("69") && message.includes("420")) {
      niceCount += 2;
      return `DAMN! 69 and 420!? There have been ${niceCount} nice words since this bot awakened`;
    }
    if (message.includes("69")) {
      niceCount++;
      return `69!? NICE. There have been ${niceCount} nice words since this bot awakened`;
    }
    if (message.includes("420")) {
      niceCount++;
      return `420!? BLAZE IT. There have been ${niceCount} nice words since this bot awakened`;
    }
    return -1;
  }

  //This function triggers off mentions of Bernie or the Bernie emoji with the
  //Bernie emoji
  function theBern(message) {
    if (message.toLowerCase().includes("bernie")) {
      return `FEEL THE BERN <:bern:802240138171514930>`;
    }
    if (message.includes(":bern:")) {
      return `FEEL THE BERN <:bern:802240138171514930>`;
    }
    if (message.toLowerCase().includes("bern")) {
      return `FEEL THE BERN <:bern:802240138171514930>`;
    }
    return -1;
  }

  //
  // Function:    stonks
  // Description: Checks the message passed in for keywords (GME, stocks, stonks)
  //              if found, returns a string message.
  // Paramters:   message - string message from chat server
  // Returns:     -1 for no keyword found, string message if found
  //
  function stonks(message) {
    if (message.toLowerCase().includes("gme")) {
      return `ALL ABOARD! TO THE MOON`;
    }
    if (
      message.toLowerCase().includes("stock") ||
      message.toLowerCase().includes("stonk")
    ) {
      return `STONKS`;
    }
    return -1;
  }

  function yingbull(message) {
    if (message.toLowerCase().trim().includes("ying")) {
      return `ying`;
    }
    return -1;
  }

  function parseMessageForMemeseum(message) {
    //Yingbull
    if (message.toLowerCase().trim().includes("ying")) {
      return `ying`;
    }
    //Stonks
    if (message.toLowerCase().includes("gme")) {
      return `ALL ABOARD! TO THE MOON`;
    }
    if (
      message.toLowerCase().includes("stock") ||
      message.toLowerCase().includes("stonk")
    ) {
      return `STONKS`;
    }
    //Bernie Sanders
    if (message.toLowerCase().includes("bernie")) {
      return `FEEL THE BERN <:bern:802240138171514930>`;
    }
    if (message.includes(":bern:")) {
      return `FEEL THE BERN <:bern:802240138171514930>`;
    }
    if (message.toLowerCase().includes("bern")) {
      return `FEEL THE BERN <:bern:802240138171514930>`;
    }
    //Nice numbers
    if (message.includes("69") && message.includes("420")) {
      niceCount += 2;
      return `DAMN! 69 and 420!? There have been ${niceCount} nice words since this bot awakened`;
    }
    if (message.includes("69")) {
      niceCount++;
      return `69!? NICE. There have been ${niceCount} nice words since this bot awakened`;
    }
    if (message.includes("420")) {
      niceCount++;
      return `420!? BLAZE IT. There have been ${niceCount} nice words since this bot awakened`;
    }
  }

  //Log the bot into Discord using the token
  client.login(token);

