/* File:      magic.js
Description:  Receives a !magic command and tells the caller to "get rekt"
Inputs:       message, args
Created:      Jan 12, 2021
Author:       Ian Ewing
*/
module.exports = {
  name: 'magic',
  description: 'Get rekt scrub',
  execute(message) {
    return message.reply(' get rekt.');
  },
};
