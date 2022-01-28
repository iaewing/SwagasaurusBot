/* File:      beep.js
Description:  Receives a !beep command and returns "Boop"
Inputs:       message, args
Created:      Jan 12, 2021
Author:       Ian Ewing
*/
// import spongebobify from 'spongebobify';
const spongebobify = require('spongebobify');

module.exports = {

      name: 'sb',
      description: 'Definitely not a robot',
      execute(message) {
        let spongebobText = message.content.split(' ');
        spongebobText.shift();
      message.channel.send(spongebobify(spongebobText.join(' ')));
    },
};
