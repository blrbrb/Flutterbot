const { debugging_channel } = require('../config/config.json');
const { PermissionFlagsBits } = require('discord.js');
const { royalguard } = require('../guardianAngel/evaluate.js');
const { AuditLogEvent } = require('discord.js');
const { rate_limits, config } = require('../guardianAngel/config.json');
const fs = require('fs');
const { Events } = require('discord.js');

module.exports = {
    name: Events.GuildRoleCreate,
    once: false,
    async execute(client, role) {
        const action = await role.guild.fetchAuditLogs({
            type: AuditLogEvent.RoleCreate,
            limit: 1
        }).then(audit => audit.entries.first());

    },
}