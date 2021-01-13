module.exports = {
      name: 'ping',
      description: 'Takes in ping, returns pong',
      execute(message, args) {
      message.channel.send('Pong.');
    },
};
