/* File: alumni.js
 * Purpose: to sort a user into the alumni role
 * Inputs: user
 * Side Effects: assigns user to role (alumni)
 * Rev History:
 *  Created 2021-01-16
 *      Timothy Nigh
 */
module.exports = {
    name: '🇦',
    description: 'Sorts user into alumni',
    execute(member) {
      member.roles.add('alumni')
  },
};