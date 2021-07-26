/* File: yearOne.js
 * Purpose: to sort a user into a year one role
 * Inputs: user, args
 * Side Effects: assigns user to role (year one)
 * Rev History:
 *  Created 2021-01-16
 *      Timothy Nigh
 */

module.exports = {
  name: '1️⃣',
  description: 'Sorts user into year one',
  execute(member) {
    const { guild } = member;
    const roleToAdd = guild.roles.cache.find((role) => role.name === 'First Year');
    member.roles.add(roleToAdd);
  },
};
