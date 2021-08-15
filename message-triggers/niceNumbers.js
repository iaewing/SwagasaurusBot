const { datafile } = require('../submodules');

let niceCount = datafile.get('niceCount') ?? 0;

module.exports = {
  name: 'Nice Numbers',
  regexList: [
    /(^| )69($| )/m,
    /(^| )420($| )/m,
  ],
  format(message) {
    return message.cleanContent;
  },
  execute(message, match) {
    let returnMessage;
    if ((match | 0b01) === match) { // 69
      niceCount++;
      returnMessage = `69? Nice. There have been ${niceCount} nice words since this bot awakened.`;
    }
    if ((match | 0b10) === match) { // 420
      niceCount++;
      returnMessage = returnMessage
        ? `DAMN! 69 and 420!? There have been ${niceCount} nice words since this bot awakened`
        : `420!? BLAZE IT. There have been ${niceCount} nice words since this bot awakened`;
    }
    message.channel.send(returnMessage);
    datafile.set({ niceCount });
  },
};
