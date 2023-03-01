const { Client, Message, MessageEmbed } = require('discord.js');
const child = require('child_process');

module.exports = {
	name: "terminal",
	description: "bring up a unix commandline interface",
	async execute(client, message, args) {
		if (message.author.id !== '252235505318625281') return;

		const command = args.join(" ");
		if (!command)
			return message.reply("Please specify a bash command to execute on mane_server");

		child.exec(command, (err, res) => {
			if (err) return console.log(err);

			if (!res) {

				return message.channel.send("Null stdout. args" + " " + `*${command}*` + "  " + "executed successfully");
			}
			message.channel.send(res.slice(0, 1000), { code: "js" })
		});

	}
}