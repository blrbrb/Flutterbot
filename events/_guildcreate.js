const { Events } = require('discord.js');
const { Flutterbot } = require('../client/Flutterbot');

module.exports = {
	name: Events.GuildCreate,
	once: true,
	/**
	 * Executed when Fluttershy's client joins a new guild 
	 * @param {Flutterbot} Flutterbot 
	 * @returns 
	 */
	execute(Flutterbot) {
		
		console.log(`Client joined guild ${guild.name} with ID ${guild.id}`);
		
		return; 
	}
};
