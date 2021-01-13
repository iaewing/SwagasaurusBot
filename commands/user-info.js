module.exports = {
      name: 'user-info',
      description: 'Returns the callers username and ID',
      execute(message, args) {
      message.channel.send(`Your username: ${message.author.username}\n
        Your ID: ${message.author.id}`);
    },
};
