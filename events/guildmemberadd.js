const { Events } = require('discord.js');
const {validateAge} = require('../utils/utilities.js'); 
const interactioncreate = require('./interactioncreate.js');
module.exports = {
	name: Events.GuildMemberAdd,
	once: true,
	async execute(Flutterbot, GuildMember) {
		try{
		let quaratineRole = Flutterbot.DB.getGuildConfig(GuildMember, 'quaratine_role');  
		let quarantinedMembers = Flutterbot.DB.getGuildConfig(GuildMember, 'quarantined');
		
		//re-assign the quaratine role to users who have been assigned the quaratine role before, 
		//but have left the server
		
		if(!Flutterbot.Evaluator.validateAge(GuildMember))
		{
			
			Flutterbot.Evaluator.quaratine(GuildMember); 
			
		}
		
	
		if(!quarantinedMembers && quarantinedMembers.includes(GuildMember.id))
		{
			if(!quaratineRole)
			{  
				
					await GuildMember.roles.add(quaratineRole);
				
				
				
					Flutterbot.Log('Red', error);
					return;
				
			} 
			return;
			
		}
		return;
	} 
	catch(error)
	{
		Flutterbot.Log('Red', error);
		return;
	}
	}
};