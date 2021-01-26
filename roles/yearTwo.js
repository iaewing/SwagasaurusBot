/* File: yearTwo.js
 * Purpose: to sort a user into a year two role
 * Inputs: user, args
 * Side Effects: assigns user to role (year two)
 * Rev History:
 *  Created 2021-01-16
 *      Timothy Nigh
 */
module.exports = {
    name: '2️⃣',
    description: 'Sorts user into year two',
    execute(member) {
      const guild = member.guild;
      const role = guild.roles.cache.find(role => role.name === 'Second Year');
      member.roles.add(role)

  },
};
