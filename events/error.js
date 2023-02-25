const { Events } = require('discord.js');
const fs = require('fs')  


module.exports = {
	name: Events.Error,
	once: true,
	execute(error) {

		console.log('My Websocket has encountered an error :(');
		console.log(`client's WebSocket encountered a connection error: ${error}`);

		fs.appendFile("error_log.txt", "World", (err) => {
  	 	if (err) {
   	 			console.log(err);
		}});
	},
};
