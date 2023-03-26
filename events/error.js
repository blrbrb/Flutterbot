const { Events } = require('discord.js');
const fs = require('fs');
//replace the value in config.json with the ID of the channel you want debugging info to be sent to
// NOTE TO SELF the channel ID, frustratingly, is not read as an integer by discord. It is a string value
const { debugging_channel } = require('../config/config.json');
module.exports = {
	name: Events.Error,
	once: true,
	execute(error) {
		console.log('My Websocket has encountered an error :(');
		console.log(`client's WebSocket encountered a connection error: ${error}`);

		//send error information to debugging channel for devs to see before archiving it 
		const channel = client.channels.cache.get(debugging_channel);
		if (channel) {
			channel.send(`An error occurred: ${error.message}`);
		}

		fs.appendFile("error_log.txt", "World", (err) => {
			if (err) {
				console.log(err);
			}
		});
	},
};