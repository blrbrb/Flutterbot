const {Events} = require('discord.js'); 


module.exports = {
    name: Events.MessageDelete,
    once: false,
    async execute(Flutterbot, message) 
    {  
		console.log('a message was deleted'); 
        message = Flutterbot.LockBox.encrypt_forgetKey(JSON.stringify(message));  
    }
};
