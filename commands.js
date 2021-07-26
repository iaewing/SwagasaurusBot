const fs = require('fs');
const Discord = require('discord.js');
const { DiscordInteractions, InteractionResponseType, MessageFlags } = require('slash-commands');
const deepEquals = require('deep-equal');
const logger = require('./logger');
const {
  token,
  appID,
  pubkey,
} = require('./config.json');

// For Slash Commands
const interaction = new DiscordInteractions({
  applicationId: appID,
  authToken: token,
  publicKey: pubkey,
});
const commandCollection = new Discord.Collection();

function loadCommands() {
  const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));
  commandFiles.forEach((file) => {
    const command = require(`./commands/${file}`);
    commandCollection.set(command.name, command);
    logger.info(`Loaded {magenta ${command.name}} from ${file}`);
  });
}

async function verifyCommandRegistration() {
  await interaction.getApplicationCommands().then(async (regCmds) => {
    logger.info(`Found ${regCmds.length} commands.`);
    const regCmdCollection = new Discord.Collection();
    regCmds.forEach(async (regCmd) => {
      logger.info(`\t{green.bold ${regCmd.name}} [${regCmd.id}]`);
      if (!commandCollection.has(regCmd.name)) {
        logger.warning(`Registered slash command ${regCmd.name} not found locally, unregistering.`);
        await interaction.deleteApplicationCommand(regCmd.id);
        return;
      }
      regCmdCollection.set(regCmd.name, regCmd);
    });
    commandCollection.forEach(async (cmd) => {
      let shouldCreate = true;
      if (regCmdCollection.has(cmd.name)) {
        const regCmd = regCmdCollection.get(cmd.name);
        if (regCmd.description === cmd.description
          && (regCmd.options ? regCmd.options.length : 0)
          === (cmd.options ? cmd.options.length : 0)) {
          shouldCreate = false;
          if (regCmd.options) {
            regCmd.options.forEach((regOpt, index) => {
              if (!deepEquals(regOpt, cmd.options[index])) {
                shouldCreate = true;
              }
            });
          }
        }
      }
      if (shouldCreate) {
        logger.warning(`Local command ${cmd.name} not registered or updated, registering.`);
        await interaction.createApplicationCommand(cmd);
      }
    });
  });
}

function processInteraction(inter, client) {
  logger.info(`Recieved command ${inter.data.name} from ${inter.member.user.username}`);
  if (commandCollection.has(inter.data.name)) {
    commandCollection.get(inter.data.name).execute(inter, client);
  }
}

async function init() {
  loadCommands();
  await verifyCommandRegistration();
}

function sendImmediateResponseMessage(inter, client, messageData) {
  client.api.interactions(inter.id, inter.token).callback.post({
    data: {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: messageData,
    },
  });
}

function sendPlaceholder(inter, client) {
  client.api.interactions(inter.id, inter.token).callback.post({
    data: {
      type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
    },
  });
}

function sendFollowUpMessage(inter, client, data) {
  new Discord.WebhookClient(client.user.id, interaction.token).send(data);
}

module.exports = {
  init,
  processInteraction,
  sendImmediateResponseMessage,
  sendPlaceholder,
  sendFollowUpMessage,
};
