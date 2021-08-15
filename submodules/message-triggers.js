const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');
const logger = require('./logger');

const messageTriggerCollection = new Discord.Collection();

function loadMessageTriggers() {
  const messageTriggerFiles = fs.readdirSync(path.join(__dirname, '/../message-triggers')).filter((file) => file.endsWith('.js'));
  messageTriggerFiles.forEach((file) => {
    const messageTrigger = require(path.join(__dirname, `/../message-triggers/${file}`));
    messageTriggerCollection.set(messageTrigger.name, messageTrigger);
    logger.info(`Loaded message trigger {cyan ${messageTrigger.name}} from ${file}`);
  });
}

function init() {
  loadMessageTriggers();
}

function proccessMessage(message) {
  messageTriggerCollection.forEach((messageTrigger) => {
    let match = 0;
    const formattedMessage = messageTrigger.format
      ? messageTrigger.format(message)
      : message.content;
    messageTrigger.regexList.forEach((regex, index) => {
      logger.trace(regex);
      if (regex.test(formattedMessage)) {
        match |= (1 << index);
        logger.trace(index);
      }
    });
    if (match !== 0) {
      logger.trace(match);
      messageTrigger.execute(message, match);
    }
  });
}

module.exports = {
  init,
  proccessMessage,
};
