module.exports = {
  name: 'Stonks',
  regexList: [
    /gme/m,
    /(^| |[a-zA-Z]+)sto[nc]k($| |[a-zA-Z]+)/m,
  ],
  format(message) {
    return message.cleanContent.toLowerCase();
  },
  execute(message, match) {
    let returnMessage;
    if ((match | 0b01) === match) { // GME
      returnMessage = 'ALL ABOARD! TO THE MOON';
    }
    if (!returnMessage && (match | 0b10) === match) { // Sto(c|n)k(s)
      returnMessage = 'STONKS';
    }
    message.channel.send(returnMessage, {
      files: [
        'https;//i.imgur.com/EFqRbev.png',
      ],
    });
  },
};
