const { widgets, roles } = require('../submodules');

async function onReady(client) {
  /*
   * User Assignment:
   * When a user is added to a server, they are assigned default roles
   * ('Unassigned' by default). A checklist-style widget is generated
   * that allows only that user to select any of the roles they
   * should be a part of and confirm. Upon confirmation, any roles
   * that should be removed will be (also 'Unassigned' by default),
   * and selected roles will be assigned.
   */

  // Get array of emojis associated with the roles available to new users
  const roleEmojis = [];
  const roleChoices = roles.getRolesInCategory('newUserSelect');
  roleChoices.forEach((role) => {
    roleEmojis.push(role.emoji);
  });

  client.guilds.cache.forEach(async (guild) => {
    // Get welcome and rules channels
    const welcomeChannel = guild.channels.cache.find((ch) => ch.name === 'welcome');
    let fetched;
    do {
      fetched = await welcomeChannel.messages.fetch({ limit: 100 });
      welcomeChannel.bulkDelete(fetched);
    }
    while (fetched.size >= 2);
    const rulesChannel = guild.channels.cache.find((ch) => ch.name === 'rules');
    await widgets.make( // Generate role selection widget
      welcomeChannel,
      `Welcome to ${guild.name}! Make sure\
 you visit <#${rulesChannel.id}> for our rules.\
 Please select an emoji for the year you are in. Select the :baby_chick:\
 if you're in Co-op and :regional_indicator_a: if you're an alumnus. Select the :white_check_mark: once\
 you've made your role selection. SWAGBOT OUT! #micdrop`,
      [
        widgets.radio(roleEmojis),
      ],
      (choices, user, reaction) => {
        const member = guild.member(user);
        roleChoices.forEach((roleChoice) => {
          // Determine roles from widget option bitmask
          if ((choices | (1 << roleChoice.flag)) === choices) {
            roles.assignRole(member, roleChoice.name);
          }
        });
        roles.getRolesInCategory('removeOnRoleSelect').forEach((role) => {
          roles.unassignRole(member, role.name);
        });
        reaction.message.reactions.cache.filter(
          (messageReaction) => messageReaction.users.cache.has(member.user.id),
        ).forEach(
          (userReaction) => {
            userReaction.users.remove(user.id);
          },
        );
      },
    );
  });
}

// eslint-disable-next-line no-unused-vars
function onMessage(message, client) {}

// eslint-disable-next-line no-unused-vars
function onGuildMemberAdd(member, client) {
  // Assign user default role(s)
  roles.getRolesInCategory('addOnJoin').forEach((role) => {
    roles.assignRole(member, role.name);
  });
}

// eslint-disable-next-line no-unused-vars
function onReaction(messageReaction, user, added) {}

module.exports = {
  onReady,
  onMessage,
  onGuildMemberAdd,
  onReaction,
};
