/* File: yearOne.js
 * Purpose: to sort a user into a year one role
 * Inputs: user, args
 * Side Effects: assigns user to role (year one)
 * Rev History:
 *  Created 2021-01-16
 *      Timothy Nigh
 */
module.exports = {
    name: '3️⃣',
    description: 'Sorts user into year three',
    execute(member, args) {
        member.addRole('yearThree')
  },
};