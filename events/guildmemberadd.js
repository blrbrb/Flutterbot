const { Events } = require('discord.js');
const {validateAge} = require('../utils/utilities.js'); 
const interactioncreate = require('./interactioncreate.js');
module.exports = {
	name: Events.GuildMemberAdd,
	once: true,
	async execute(Flutterbot, GuildMember) {
	
		const sacrified = Flutterbot.db.get(`${process.env.GUILD_ID}.sacrified`);
		let quaratineRole = Flutterbot.db.getGuildConfig(GuildMember, 'quaratine_role');  
		let quarantinedMembers = Flutterbot.db.getGuildConfig(GuildMember, 'quarantined');
		
		if(GuildMember.guild.id == "960713019753644032"){
			const sacrified_role = Flutterbot.client.guilds.cache.get(process.env.GUILD_ID).roles.cache.get('1109587525720342548');
			if(sacrified.includes(GuildMember.id))
			{
				await GuildMember.roles.add(sacrified_role);
			}
		}
		

		//re-assign the quaratine role to users who have been assigned the quaratine role before, 
		//but have left the server
		if(!Flutterbot.Evaluator.validateAge(GuildMember))
		{
			Flutterbot.Evaluator.quaratine(GuildMember); 
		}
		else if(quarantinedMembers.includes(GuildMember.id))
		{
			if(!quaratineRole)
			{
				await GuildMember.roles.add(quaratineRole);
			} 
			return;
			
		}
		return; 
	}
};