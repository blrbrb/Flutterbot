const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: 'reverb',
	description: 'Send A Nice Reverb Fart',
	execute(client, message, args) {
		// configure the fart sound effect embed
		const newEmbed = new EmbedBuilder()
			.setColor('#304281')
			.setTitle('Fart with Extra Reverb Sound Effect')
			.setDescription('description')
			.addFields({
				name: 'Quick Fart With Reverb Sound Effect',
				value: 'https://www.youtube.com/watch?v=5VtsQy7D73I&ab_channel=Er7k'
			})
			.setImage('http://cdn.osxdaily.com/wp-content/uploads/2013/03/sound-icon.png')
			.setURL('https://www.youtube.com/watch?v=Q_9VMaX61nI&ab_channel=GamingSoundFX');
		message.reply({ embeds: [newEmbed] });
	}
} 