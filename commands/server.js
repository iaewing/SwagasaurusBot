module.exports = {
      name: 'server',
      description: 'Returns basic information about the server',
      execute(message, args) {
      message.channel.send(`This server's name is: ${message.guild.name}\n
      Total members: ${message.guild.memberCount}`);
    },
};
