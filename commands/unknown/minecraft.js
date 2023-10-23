const request = require('request').defaults({ encoding: null });

module.exports = {
	name: 'minecraft',
	description: 'Fluttershy Will Spoofy you a Minecraft Achivement',
	async execute(shy, message, args) { // eslint-disable-line no-unused-vars 
		console.log('minecraft');
		if (args.length > 0) {
			message.channel.startTyping();
			const memeOutput = request(`https://www.minecraftskinstealer.com/achievement/a.php?i=13&h=Achievement+get%21&t=${args.join("+")}`);
			message.channel.send({
				files: [{
					attachment: memeOutput,
					name: "mc.png"
				}]
			});
		} else {
			message.reply("Uhhm... I need text to customize a minecraft achivement");
		}
	}
}