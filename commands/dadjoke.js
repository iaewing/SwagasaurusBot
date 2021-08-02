/* File Name: dadjoke.js
 * Description: Receives a !dadjoke command and returns a dad joke from an online API
 * Revision History:
 *  Created 2021-7-8
 *  DanWritesCode / Dan
 *  Updated 2021-7-25
 *  Silas (ExVacuum)
 */

const bent = require('bent');
const { commands } = require('../subsystems');

const get = bent('json');

module.exports = {
  name: 'dadjoke',
  description: 'Prints a dad joke',
  async execute(interaction, client) {
    let response;
    try {
      response = (await get('https://icanhazdadjoke.com')).joke ?? 'Unfortunately, dad is unwell at the moment and cannot tell a joke :frowning2:';
    } catch (e) {
      response = 'Unfortunately, dad is unwell at the moment and cannot tell a joke :frowning2:';
    }
    commands.sendImmediateResponseMessage(interaction, client, { content: response });
  },
};
