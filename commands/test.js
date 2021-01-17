/* File:      test.js
Description:  Receives a !test command and returns an easter egg message
Inputs:       message, args
Created:      Jan 12, 2021
Author:       Ian Ewing
*/
module.exports = {
      name: 'test',
      description: 'Takes in ping, returns pong',
      execute(message, args) {
      message.channel.send(`YOU'RE NOT MY REAL DAD`);
    },
};
