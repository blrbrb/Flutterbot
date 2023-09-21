const { Events } = require('discord.js');

module.exports = {
	name: Events.GuildCreate,
	once: true,
	execute(client) {
		console.log(`Client joined guild ${guild.name} with ID ${guild.id}`);
		createGuild(Flutterbot, guild, true);

		guild.commands.set(Flutterbot.clientslashcommands);
		return; 
	}
};
