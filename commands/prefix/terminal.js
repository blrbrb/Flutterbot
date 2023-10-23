const child = require('child_process');

module.exports = {
	name: "terminal",
	description: "bring up a unix commandline interface",
	cooldown: 0,
	async execute(shy, message, args) {
		console.log('terminal command was called'); 
		if (message.author.id !== '252235505318625281') return;

		const command = args.join(" ");
		if (!command)
			return message.reply("Please specify a bash command to execute on mane_server");

		child.exec(command, (err, res) => {
			if (err) return console.log(err);

			if (!res) {

				return message.channel.send("Null stdout. args" + " " + `*${command}*` + "  " + "executed successfully");
			}
			message.reply(res.slice(0, 1000), { code: "js" })
		});

	}
}