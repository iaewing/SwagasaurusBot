/* File:      server.js
Description:  Allows a user to gain basic information about the server. 
Inputs:       message, args
Created:      Jan 12, 2021
Author:       Ian Ewing
*/
module.exports = {
  name: 'server',
  description: 'Returns basic information about the server',
  execute(message) {
    message.channel.send(`This server's name is: ${message.guild.name}\n
      Total members: ${message.guild.memberCount}`);
  },
};
