const Discord = require('discord.js');

const activeWidgets = new Discord.Collection();

async function checklist(channel, message, emojiList, callback) {
  const sentMessage = await channel.send(message);
  emojiList.forEach(async (emoji) => {
    await sentMessage.react(emoji);
  });
  sentMessage.react('✅');
  activeWidgets.set(sentMessage.id, {
    type: 'checklist',
    emojiList,
    choices: 0,
    callback,
  });
  return sentMessage.id;
}

function setChoice(widget, emoji, value) {
  const flag = widget.emojiList.indexOf(emoji);
  const valueNormalized = value ? 1 : 0;
  const clearMask = ~(1 << flag);
  widget.choices &= clearMask;
  widget.choices |= (valueNormalized << flag);
}

function handleSubmit(widget) {
  widget.callback(widget.choices);
  activeWidgets.delete(widget);
}

function handleReaction(widgetID, reaction, value) {
  const widget = activeWidgets.get(widgetID);
  const emoji = reaction.emoji.name;
  switch (widget.type) {
    case 'checklist':
      switch (emoji) {
        case '✅':
          handleSubmit(widget);
          break;
        default:
          if (widget.emojiList.includes(emoji)) {
            setChoice(widget, emoji, value);
            break;
          }
          reaction.remove();
          break;
      }
      break;
    default:
      break;
  }
}

function restrictToUser(widgetID, user) {
  activeWidgets.get(widgetID).lockedTo = user.id;
}

function getWidget(id) {
  return activeWidgets.get(id);
}

module.exports = {
  checklist,
  handleReaction,
  restrictToUser,
  getWidget,
};
