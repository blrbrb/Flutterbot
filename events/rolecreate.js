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

        if (royalguard.haslogEntry(action)) {

            data = royalguard.fetchdata(action.executor.username);

            const actual_rate = data.latest_action - data.previous_action.timestamp;

            const time_rate = actual_rate / 1000;

            if (actual_rate < rate_limits.createRole) {
                const channel = Flutterbot.clientchannels.cache.get(config.warning_channel);

                if (channel) {
                    const message = 'An error occurred:\n```js\n%s\n```' + `Instance: ${os.hostname} \n Server: ${guild_name}`;
                    channel.send(`\`${action.executor.username}\` is creating new roles at a rate of  ${actual_rate / time_rate} per second. \n \` angelBunny::main* guardian.globals.stat == 'MATIN'\``);
                } else {
                    console.error(`rolecreate.js. Guardian tried to create warning message, but no warnings channel was specified. Guild:`);
                }
            }

            royalguard.writeLog(action, role.guild, 1);
            return;
        } else {
            royalguard.writeLog(action, role.guild);
            return;
        }
    },
}