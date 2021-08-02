module.exports = {
  name: 'The Bern',
  regexList: [
    /(^| |:)bern($| |:|ie)/m,
  ],
  format(message) {
    return message.content.toLowerCase();
  },
  execute(message, match) {
    if ((match | 0b1) === match) {
      message.channel.send('FEEL THE BERN <:bern:802240138171514930>');
    }
  },
};
