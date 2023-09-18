const { InteractionCollector } = require("discord.js");
const {socialHelp} = require('../../lang/en.js'); 

module.exports = {
	name: "imlonely",
	description: "",
	async execute(Flutterbot, message, args)
    {
        //for now
        return; 
        const user = message.author; 
        const dmChannel = await message.author.createDM();
        await dmChannel.send(socialHelp.imlonely());
      
        //remember 
        const filter = (response) => !response.author.bot;
        Flutterbot.collectors.set(message.author.id, dmChannel.createMessageCollector({filter})) 
       
        return; 
    }

}