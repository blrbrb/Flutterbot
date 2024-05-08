const { debugging_channel } = require('../config/config.json');
const { PermissionFlagsBits } = require('discord.js');
const { royalguard } = require('../guardianAngel/evaluate.js');
const { AuditLogEvent } = require('discord.js');
const { always_trusted, config } = require('../guardianAngel/config.json');
const fs = require('fs');
const { Events } = require('discord.js');

module.exports = {
    name: Events.GuildRoleUpdate,
    once: false,
    async execute(Flutterbot, role) {
        if (role.permissions.has(PermissionFlagsBits.Administrator)) {
            const action = await role.guild.fetchAuditLogs({
                type: AuditLogEvent.RoleCreate,
                limit: 1
            }).then(audit => audit.entries.first());

           
            
        }
    }
};
