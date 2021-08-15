const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');
const logger = require('./logger');

const roleCollection = new Discord.Collection(); // Create a collection of roles

function loadRoles() {
  // Gather every file from the roles folder with the .js extension
  const roleFiles = fs.readdirSync(path.join(__dirname, '/../roles')).filter((file) => file.endsWith('.json'));
  roleFiles.forEach((file) => {
    const role = require(path.join(__dirname, `/../roles/${file}`));
    logger.info(`Loaded role {blue ${role.name}} from ${file}`);
    roleCollection.set(role.name, role);
  });
}

function verifyAndLinkRoles(client) {
  client.guilds.cache.forEach((guild) => {
    logger.info(`Searching for matching roles in ${guild.name}...`);
    roleCollection.forEach((role) => {
      const roleOnServer = guild.roles.cache.find((gRole) => gRole.name === role.name);
      if (roleOnServer) {
        logger.info(`- Found role {green.bold ${roleOnServer.name}}. Linking to local version.`);
        role.roleOnServer = {
          ...(role.roleOnServer ?? {}),
          [guild.id]: roleOnServer,
        };
        return;
      }
      logger.warning(`- Role {green.bold ${role.name}} not found on server, this will likely have unintended consequences, consider fixing.`);
    });
  });
}

function init(client) {
  loadRoles();
  roleCollection.sort((a, b) => a.flag - b.flag);
  verifyAndLinkRoles(client);
}

function getRolesInCategory(category) {
  return roleCollection.filter((role) => role.categories && role.categories[category]);
}

function assignRole(member, role) {
  member.roles.add(roleCollection.get(role).roleOnServer[member.guild.id]);
  logger.info(`Added user ${member.user.username}#${member.user.discriminator} to role {blue ${role}} on ${member.guild.name}.`);
}

function unassignRole(member, role) {
  member.roles.remove(roleCollection.get(role).roleOnServer[member.guild.id]);
  logger.info(`Removed user ${member.user.username}#${member.user.discriminator} from role {blue ${role}} on ${member.guild.name}.`);
}

function findByEmoji(emoji) {
  return roleCollection.find((role) => role.emoji === emoji);
}

module.exports = {
  init,
  getRolesInCategory,
  assignRole,
  unassignRole,
  findByEmoji,
};
