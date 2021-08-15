const Discord = require('discord.js');

const activeWidgets = new Discord.Collection();

const ComponentTypes = {
  RADIO: 1,
  CHECKLIST: 2,
};

async function make(channel, message, componentList, callback) {
  const sentMessage = await channel.send(message);
  componentList.forEach((component) => {
    component.emojiList.forEach(async (emoji) => {
      await sentMessage.react(emoji);
    });
  });
  sentMessage.react('✅');
  activeWidgets.set(sentMessage.id, {
    componentList,
    choices: 0,
    callback,
  });
  return sentMessage.id;
}

function setChoice(widget, emoji, value) {
  let flag = 0;
  for (let i = 0; i < widget.componentList.length; i++) {
    const component = widget.componentList[i];
    if (component.emojiList.includes(emoji)) {
      flag += component.emojiList.indexOf(emoji);
      break;
    }
    flag += component.emojiList.length;
  }
  const valueNormalized = value ? 1 : 0;
  const clearMask = ~(1 << flag);
  widget.choices &= clearMask;
  widget.choices |= (valueNormalized << flag);
}

function handleSubmit(widget, user, reaction) {
  let choiceIndex = 0;
  for (let i = 0; i < widget.componentList.length; i++) {
    const component = widget.componentList[i];
    let success = false;
    switch (component.type) {
      case ComponentTypes.RADIO:
        for (let j = 0; j < component.emojiList.length; j++) {
          if ((widget.choices | (1 << choiceIndex)) === widget.choices) {
            success = true;
            break;
          }
          choiceIndex++;
        }
        break;
      default:
        success = true;
        break;
    }
    if (!success) {
      reaction.users.remove(user.id);
      return;
    }
  }

  widget.callback(widget.choices, user, reaction);
}

function handleReaction(widgetID, reaction, user, added) {
  const widget = activeWidgets.get(widgetID);
  const emoji = reaction.emoji.name;
  let component;
  switch (emoji) {
    case '✅':
      handleSubmit(widget, user, reaction);
      break;
    default:
      for (let i = 0; i < widget.componentList.length; i++) {
        if (widget.componentList[i].emojiList.includes(emoji)) {
          component = widget.componentList[i];
          break;
        }
      }
      if (component) {
        switch (component.type) {
          case ComponentTypes.RADIO:
            component.emojiList.forEach((listEmoji) => {
              if (listEmoji === emoji) {
                setChoice(widget, emoji, added);
                return;
              }
              if (added) {
                const reactionToRemove = reaction.message.reactions.cache.find(
                  (messageReaction) => (messageReaction.emoji.name === listEmoji
                    && messageReaction.users.cache.find(
                      (reactionUser) => reactionUser.id === user.id,
                    )
                  ),
                );
                if (reactionToRemove) {
                  setChoice(widget, listEmoji, 0);
                  reactionToRemove.users.remove(user.id);
                }
              }
            });
            break;
          case ComponentTypes.CHECKLIST:
            setChoice(widget, emoji, added);
            break;
          default:
            break;
        }
        break;
      }
      reaction.remove();
      break;
  }
}

function restrictToUser(widgetID, user) {
  activeWidgets.get(widgetID).lockedTo = user.id;
}

function getWidget(id) {
  return activeWidgets.get(id);
}

function radio(emojiList) {
  return {
    type: ComponentTypes.RADIO,
    emojiList,
  };
}

function checklist(emojiList) {
  return {
    type: ComponentTypes.CHECKLIST,
    emojiList,
  };
}

function destroy(message) {
  activeWidgets.delete(message.id);
  message.delete(1000);
}

module.exports = {
  make,
  radio,
  checklist,
  handleReaction,
  restrictToUser,
  getWidget,
  destroy,
};
