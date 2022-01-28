/* File:      beep.js
Description:  Receives a !beep command and returns "Boop"
Inputs:       message, args
Created:      Jan 12, 2021
Author:       Ian Ewing
*/
module.exports = {
      name: 'beep',
      description: 'Definitely not a robot',
      execute(message) {
      message.channel.send('Boop!');
    },
};
