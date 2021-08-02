/*
Program:      Swagasaurus Bot
Description:  Bot utilizing node.js and discord.js. Preforms basic functionality
              such as greeting new users and assigning them roles based on their
              selection of an emoji on a welcome message. Also contains commands
              triggered by certain text commands prefixed with a "!"
Authors:      Ian Ewing and Timothy Nigh
Created:      January 12, 2021
Updated:      August 1, 2021
*/

const Discord = require('discord.js');
const { // Add the configuration JSON as a dependency
  token,
} = require('./config.json');
const {
  logger,
  commands,
  roles,
  widgets,
  messageTriggers,
} = require('./subsystems'); // Require subsystems

const client = new Discord.Client();

// Called once bot is ready
client.once('ready', async () => {
  await commands.init(); // Initialize all commands
  roles.init(client);
  messageTriggers.init();
  logger.rainbow('Swagasaurus Rex is Ready!');
});

// Called whenever a message is sent
client.on('message', (message) => {
  if (!message.author.bot) { // Block bot messages
    messageTriggers.proccessMessage(message);
  }
});

client.ws.on('INTERACTION_CREATE', async (interaction) => {
  commands.processInteraction(interaction, client);
});

client.on('guildMemberAdd', async (member) => {
  roles.getRolesInCategory('addOnJoin').forEach((role) => {
    roles.assignRole(member, role.name);
  });

  const channel = member.guild.channels.cache.find((ch) => ch.name === 'welcome');
  const rulesChannel = member.guild.channels.cache.find((ch) => ch.name === 'rules');
  const roleEmojis = [];
  const roleChoices = roles.getRolesInCategory('newUserSelect');
  roleChoices.forEach((role) => {
    roleEmojis.push(role.emoji);
  });
  const roleSelectChecklist = await widgets.checklist(
    channel,
    `${member.user.toString()} has joined the server! Make sure\
  you visit <#${rulesChannel.id}> for our rules.\
  Please select an emoji for the year you are in. Select the :baby_chick:\
  if you're in Co-op and :regional_indicator_a: if you're an alumnus. Select the :white_check_mark: once\
  you've made your role selection. SWAGBOT OUT! #micdrop`,
    roleEmojis,
    (choices) => {
      roleChoices.forEach((roleChoice) => {
        if ((choices | (1 << roleChoice.flag)) === choices) {
          roles.assignRole(member, roleChoice.name);
        }
      });
      roles.getRolesInCategory('removeOnRoleSelect').forEach((role) => {
        roles.unassignRole(member, role.name);
      });
    },
  );
  widgets.restrictToUser(roleSelectChecklist, member.user);
});

function handleMessageReactionEvent(messageReaction, user, value) {
  const { message } = messageReaction;
  if (!user.bot && widgets.getWidget(message.id)) {
    if (
      !widgets.getWidget(message.id).lockedTo
      || widgets.getWidget(message.id).lockedTo === user.id
    ) {
      widgets.handleReaction(message.id, messageReaction, value);
      return;
    }
    messageReaction.users.remove(user);
  }
}

client.on('messageReactionAdd', (messageReaction, user) => {
  handleMessageReactionEvent(messageReaction, user, true);
});

client.on('messageReactionRemove', (messageReaction, user) => {
  handleMessageReactionEvent(messageReaction, user, false);
});

// Log the bot into Discord using the token
client.login(token);
