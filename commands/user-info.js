/* File:      server.js
Description:  Allows a user to gain basic information about themselves. 
Inputs:       message, args
Created:      Jan 12, 2021
Author:       Ian Ewing
*/
module.exports = {
      name: 'user-info',
      description: 'Returns the callers username and ID',
      execute(message, args) {
      message.channel.send(`Your username: ${message.author.username}\n
        Your ID: ${message.author.id}`);
    },
};
