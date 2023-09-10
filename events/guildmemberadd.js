const { Events } = require('discord.js');
const {validateAge} = require('../utils.js'); 
module.exports = {
	name: Events.GuildMemberAdd,
	once: true,
	async execute(Flutterbot, GuildMember) {
	
		const sacrified = Flutterbot.db.getValue(`${process.env.GUILD_ID}.sacrified`); 
		const sacrified_role = client.guilds.cache.get(process.env.GUILD_ID).roles.cache.get('1109587525720342548');
		if(sacrified.includes(GuildMember.id))
		{
			await GuildMember.roles.add(sacrified_role);
		}

	}
};