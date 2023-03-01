const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log('Fluttershy is Awake Yay! :3');
	}
};
