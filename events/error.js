const { Events } = require('discord.js');

module.exports = {
	name: Events.Error,
	once: true,
	execute(error) {

		console.log('My Websocket has encountered an error :(');
		console.log(`client's WebSocket encountered a connection error: ${error}`);
	},
};