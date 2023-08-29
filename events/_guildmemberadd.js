const { Events } = require('discord.js');

module.exports = {
    name: Events.GuildMemberAdd,
    once: true,
    execute() {
        guildMember.roles.add(welcomeRole);
        guildMember.guild.channels.cache.get('960713019753644035').send(` <@${guildMember.user.id}> HI NEW FRIEND!!`);
        return;
    }
};