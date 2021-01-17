/* File: coop.js
 * Purpose: to sort a user into the coop role
 * Inputs: user
 * Side Effects: assigns user to role (coop)
 * Rev History:
 *  Created 2021-01-16
 *      Timothy Nigh
 */
module.exports = {
    name: '🐔',
    description: 'Sorts user into coop',
    execute(member) {
      member.roles.add('coop')
  },
};