module.exports = {
      name: 'beep',
      description: 'Definitely not a robot',
      execute(message, args) {
      message.channel.send('Boop!');
    },
};
