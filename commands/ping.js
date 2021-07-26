/* File:      beep.js
Description:  Receives a !ping command and returns "Pong"
Inputs:       message, args
Created:      Jan 12, 2021
Author:       Ian Ewing
*/
module.exports = {
  name: 'ping',
  description: 'Takes in ping, returns pong',
  execute(message) {
    message.channel.send('Pong.');
  },
};
