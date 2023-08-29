const child = require('child_process');

module.exports = {
	name: "terminal",
	description: "bring up a unix commandline interface",
	async execute(client, message, args) {
		console.log('terminal command was called');
		if (
			message.author.id !== '252235505318625281' ||
			message.author.id !== '340948459983077379'
		) return;

		const command = args.join(" ");
		if (!command)
			return message.reply("Please specify a bash command to execute on mane_server");

		child.exec(command, (err, res) => {
			if (err) {
				message.channel.send("Error: " + " " + `*${command}*` + "  " + "executed successfully");
				return console.log(err);
			}
			if (!res) return message.channel.send("Null stdout. args " + `*${command}*` + "  " + "executed successfully");
			message.reply(res.slice(0, 1000), { code: "js" })
		});

	}
}