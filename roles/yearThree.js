/* File: yearThree.js
 * Purpose: to sort a user into a year three role
 * Inputs: user, args
 * Side Effects: assigns user to role (year three)
 * Rev History:
 *  Created 2021-01-16
 *      Timothy Nigh
 */
module.exports = {
    name: '3️⃣',
    description: 'Sorts user into year three',
    execute(member) {
      const guild = member.guild;
      const role = guild.roles.cache.find(role => role.name === 'yearThree');
      member.roles.add(role)
  },
};